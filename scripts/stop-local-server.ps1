$connections = Get-NetTCPConnection -LocalPort 3000 -State Listen -ErrorAction SilentlyContinue

if (-not $connections) {
  Write-Host "Nu ruleaza niciun server local pe portul 3000."
  exit 0
}

$processIds = $connections | Select-Object -ExpandProperty OwningProcess -Unique

foreach ($processId in $processIds) {
  $process = Get-Process -Id $processId -ErrorAction SilentlyContinue

  if (-not $process) {
    continue
  }

  if ($process.ProcessName -ne "node") {
    Write-Host "Portul 3000 este folosit de $($process.ProcessName) (PID $processId). Nu l-am oprit automat."
    continue
  }

  Stop-Process -Id $processId -Force
  Write-Host "Am oprit serverul local Node de pe portul 3000 (PID $processId)."
}
