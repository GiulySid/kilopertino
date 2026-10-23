# Generate lighter muted MP4 previews for gallery tiles.
# Usage: powershell -File tools/make-video-previews.ps1
$ErrorActionPreference = "Stop"
$env:Path = [System.Environment]::GetEnvironmentVariable("Path", "Machine") + ";" +
  [System.Environment]::GetEnvironmentVariable("Path", "User")

$dirs = @(
  (Join-Path $PSScriptRoot "..\media\circo"),
  (Join-Path $PSScriptRoot "..\media\soulshake")
)

foreach ($dir in $dirs) {
  $dir = Resolve-Path $dir
  $previewDir = Join-Path $dir "preview"
  if (-not (Test-Path $previewDir)) {
    New-Item -ItemType Directory -Path $previewDir -Force | Out-Null
  }

  Get-ChildItem $dir -File -Filter *.mp4 | ForEach-Object {
    $out = Join-Path $previewDir $_.Name
    if ((Test-Path $out) -and ((Get-Item $out).Length -gt 0)) {
      Write-Host "Skip $($_.Name) (exists)"
      return
    }
    Write-Host "Preview $($_.Name)"
    & ffmpeg -y -hide_banner -loglevel error `
      -i $_.FullName `
      -vf "scale='min(720,iw)':-2" `
      -c:v libx264 -preset veryfast -crf 30 `
      -an -movflags +faststart `
      $out
    if ($LASTEXITCODE -ne 0) {
      Write-Warning "Failed: $($_.Name)"
    }
  }
}

Write-Host "Done."
