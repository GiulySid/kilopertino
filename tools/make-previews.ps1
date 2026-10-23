# Generate lighter JPEG previews for gallery tiles.
# Usage: powershell -File tools/make-previews.ps1
Add-Type -AssemblyName System.Drawing

function New-PreviewImage {
  param(
    [string]$InputPath,
    [string]$OutputPath,
    [int]$MaxEdge = 900,
    [int]$Quality = 60
  )

  $img = [System.Drawing.Image]::FromFile((Resolve-Path $InputPath))
  try {
    $scale = [Math]::Min(1.0, $MaxEdge / [Math]::Max($img.Width, $img.Height))
    $w = [Math]::Max(1, [int][Math]::Round($img.Width * $scale))
    $h = [Math]::Max(1, [int][Math]::Round($img.Height * $scale))
    $bmp = New-Object System.Drawing.Bitmap $w, $h
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $g.DrawImage($img, 0, 0, $w, $h)
    $g.Dispose()

    $dir = Split-Path $OutputPath -Parent
    if (-not (Test-Path $dir)) {
      New-Item -ItemType Directory -Path $dir -Force | Out-Null
    }

    $jpgCodec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() |
      Where-Object { $_.MimeType -eq "image/jpeg" }
    $enc = New-Object System.Drawing.Imaging.EncoderParameters 1
    $enc.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter (
      [System.Drawing.Imaging.Encoder]::Quality,
      [long]$Quality
    )
    $bmp.Save($OutputPath, $jpgCodec, $enc)
    $bmp.Dispose()
  } finally {
    $img.Dispose()
  }
}

$dirs = @(
  (Join-Path $PSScriptRoot "..\media\menagrama"),
  (Join-Path $PSScriptRoot "..\media\soulshake")
)

foreach ($dir in $dirs) {
  $dir = Resolve-Path $dir
  Get-ChildItem $dir -File | Where-Object { $_.Extension -match '\.(jpe?g|png)$' } | ForEach-Object {
    $preview = Join-Path $dir ("preview\" + [IO.Path]::ChangeExtension($_.Name, ".jpg"))
    Write-Host "Preview $($_.Name)"
    New-PreviewImage -InputPath $_.FullName -OutputPath $preview
  }
}
