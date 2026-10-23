<?php
/**
 * Optional. Needed only to send real email from localhost.
 * On Aruba hosting, inquire.php uses PHP mail() and does not need this file.
 *
 * To test locally:
 * 1. Copy this file to mail-config.php
 * 2. Put the password of info@kilopertino.com below
 *
 * Aruba SMTP (same-domain mailbox):
 * https://guide.hosting.aruba.it/
 */
return [
    "host" => "smtp.aruba.it",
    "port" => 465,
    "encryption" => "ssl",
    "username" => "info@kilopertino.com",
    "password" => "YOUR_MAILBOX_PASSWORD",
    "from" => "info@kilopertino.com",
    "from_name" => "Kilopertino",
    "to" => "info@kilopertino.com",
];
