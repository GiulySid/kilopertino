<?php
header("Content-Type: application/json; charset=utf-8");

if (($_SERVER["REQUEST_METHOD"] ?? "") !== "POST") {
    http_response_code(405);
    echo json_encode(["ok" => false]);
    exit;
}

function inquire_clean_header($value) {
    return trim(str_replace(["\r", "\n", "\0"], "", (string) $value));
}

function inquire_is_local() {
    if (PHP_SAPI === "cli-server") {
        return true;
    }
    $addr = $_SERVER["REMOTE_ADDR"] ?? "";
    return in_array($addr, ["127.0.0.1", "::1"], true);
}

function inquire_load_mail_config() {
    $path = __DIR__ . DIRECTORY_SEPARATOR . "mail-config.php";
    if (!is_file($path)) {
        return null;
    }
    $config = require $path;
    return is_array($config) ? $config : null;
}

function inquire_smtp_expect($socket, $codes) {
    $response = "";
    while (($line = fgets($socket, 515)) !== false) {
        $response .= $line;
        if (isset($line[3]) && $line[3] === " ") {
            break;
        }
    }
    $code = (int) substr($response, 0, 3);
    $allowed = is_array($codes) ? $codes : [$codes];
    if (!in_array($code, $allowed, true)) {
        throw new RuntimeException("SMTP error ({$code}): " . trim($response));
    }
    return $response;
}

function inquire_smtp_cmd($socket, $command, $codes) {
    fwrite($socket, $command . "\r\n");
    return inquire_smtp_expect($socket, $codes);
}

function inquire_send_smtp(array $config, $to, $subject, $body, $replyTo) {
    $host = (string) ($config["host"] ?? "");
    $port = (int) ($config["port"] ?? 587);
    $encryption = strtolower((string) ($config["encryption"] ?? "tls"));
    $username = (string) ($config["username"] ?? "");
    $password = (string) ($config["password"] ?? "");
    $from = (string) ($config["from"] ?? $username);
    $fromName = (string) ($config["from_name"] ?? "Kilopertino");

    if ($host === "" || $username === "" || $password === "" || $from === "") {
        throw new RuntimeException("Incomplete SMTP config");
    }

    $remote = ($encryption === "ssl" ? "ssl://" : "") . $host . ":" . $port;
    $socket = @stream_socket_client($remote, $errno, $errstr, 20, STREAM_CLIENT_CONNECT);
    if (!$socket) {
        throw new RuntimeException("SMTP connect failed: {$errstr} ({$errno})");
    }
    stream_set_timeout($socket, 20);

    inquire_smtp_expect($socket, 220);
    $ehloHost = "kilopertino.local";
    inquire_smtp_cmd($socket, "EHLO " . $ehloHost, 250);

    if ($encryption === "tls") {
        inquire_smtp_cmd($socket, "STARTTLS", 220);
        if (!stream_socket_enable_crypto($socket, true, STREAM_CRYPTO_METHOD_TLS_CLIENT)) {
            throw new RuntimeException("SMTP STARTTLS failed");
        }
        inquire_smtp_cmd($socket, "EHLO " . $ehloHost, 250);
    }

    inquire_smtp_cmd($socket, "AUTH LOGIN", 334);
    inquire_smtp_cmd($socket, base64_encode($username), 334);
    inquire_smtp_cmd($socket, base64_encode($password), 235);

    inquire_smtp_cmd($socket, "MAIL FROM:<{$from}>", 250);
    inquire_smtp_cmd($socket, "RCPT TO:<{$to}>", [250, 251]);
    inquire_smtp_cmd($socket, "DATA", 354);

    if (function_exists("mb_encode_mimeheader")) {
        $encodedSubject = mb_encode_mimeheader($subject, "UTF-8", "B", "\r\n");
        $encodedFromName = mb_encode_mimeheader($fromName, "UTF-8", "B", "\r\n");
    } else {
        $encodedSubject = $subject;
        $encodedFromName = $fromName;
    }

    $safeBody = preg_replace("/^\./m", "..", str_replace(["\r\n", "\r"], "\n", $body));
    $safeBody = str_replace("\n", "\r\n", $safeBody);

    $data = [
        "From: {$encodedFromName} <{$from}>",
        "To: <{$to}>",
        "Reply-To: <{$replyTo}>",
        "Subject: {$encodedSubject}",
        "MIME-Version: 1.0",
        "Content-Type: text/plain; charset=UTF-8",
        "Content-Transfer-Encoding: 8bit",
        "X-Mailer: kilopertino.com",
        "",
        $safeBody,
        ".",
    ];
    fwrite($socket, implode("\r\n", $data) . "\r\n");
    inquire_smtp_expect($socket, 250);
    inquire_smtp_cmd($socket, "QUIT", 221);
    fclose($socket);
}

function inquire_send_mail($to, $subject, $body, $replyTo) {
    if (function_exists("mb_encode_mimeheader")) {
        $encodedSubject = mb_encode_mimeheader($subject, "UTF-8", "B", "\r\n");
    } else {
        $encodedSubject = $subject;
    }

    $headers = [
        "From: Kilopertino <info@kilopertino.com>",
        "Reply-To: " . $replyTo,
        "MIME-Version: 1.0",
        "Content-Type: text/plain; charset=UTF-8",
        "X-Mailer: kilopertino.com",
    ];
    $headerLine = implode("\r\n", $headers);

    $sent = @mail($to, $encodedSubject, $body, $headerLine, "-f info@kilopertino.com");
    if (!$sent) {
        $sent = @mail($to, $encodedSubject, $body, $headerLine);
    }
    return (bool) $sent;
}

function inquire_log_dev($to, $subject, $body) {
    $log = __DIR__ . DIRECTORY_SEPARATOR . "mail-log.txt";
    $entry = "[" . date("c") . "]\nTo: {$to}\nSubject: {$subject}\n{$body}\n\n";
    return @file_put_contents($log, $entry, FILE_APPEND | LOCK_EX) !== false;
}

$honeypot = trim((string) ($_POST["company"] ?? ""));
if ($honeypot !== "") {
    echo json_encode(["ok" => true]);
    exit;
}

$name = inquire_clean_header($_POST["name"] ?? "");
$email = inquire_clean_header($_POST["email"] ?? "");
$message = trim((string) ($_POST["message"] ?? ""));

if ($name === "" || $email === "" || $message === "") {
    http_response_code(422);
    echo json_encode(["ok" => false, "reason" => "missing"]);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL) || strlen($name) > 200 || strlen($email) > 200 || strlen($message) > 5000) {
    http_response_code(422);
    echo json_encode(["ok" => false, "reason" => "invalid"]);
    exit;
}

$config = inquire_load_mail_config();
$to = inquire_clean_header((string) (($config["to"] ?? null) ?: "info@kilopertino.com"));
$subject = "WEBSITE NOTE - " . $name;
$body = $name . " - " . $email . " wrote:\n" . $message;

try {
    if ($config) {
        inquire_send_smtp($config, $to, $subject, $body, $email);
        echo json_encode(["ok" => true]);
        exit;
    }

    if (inquire_is_local()) {
        if (!inquire_log_dev($to, $subject, $body)) {
            http_response_code(500);
            echo json_encode(["ok" => false, "reason" => "log"]);
            exit;
        }
        echo json_encode(["ok" => true, "dev" => true]);
        exit;
    }

    if (!inquire_send_mail($to, $subject, $body, $email)) {
        http_response_code(500);
        echo json_encode(["ok" => false, "reason" => "mail"]);
        exit;
    }

    echo json_encode(["ok" => true]);
} catch (Throwable $error) {
    http_response_code(500);
    echo json_encode(["ok" => false, "reason" => "smtp", "message" => $error->getMessage()]);
}
