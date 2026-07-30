<#
.SYNOPSIS
    MongoDB Atlas Backup Script for Alchemy 360 Sports Arena (Windows).
.DESCRIPTION
    Dumps all collections from the Atlas cluster using mongodump and compresses the output.
.PARAMETER DbName
    The name of the database to back up. Defaults to 'red-ball'.
.EXAMPLE
    .\backup.ps1
.EXAMPLE
    .\backup.ps1 -DbName "test"
#>
[CmdletBinding()]
param (
    [string]$DbName = "red-ball"
)

# 1. Check if mongodump is installed
$mongoDumpExists = Get-Command "mongodump" -ErrorAction SilentlyContinue
if (-not $mongoDumpExists) {
    Write-Host "[ERROR] 'mongodump' is not installed or not in your system PATH." -ForegroundColor Red
    Write-Host ""
    Write-Host "To install MongoDB Database Tools on Windows:" -ForegroundColor Yellow
    Write-Host "1. Download the installer from: https://www.mongodb.com/try/download/database-tools"
    Write-Host "2. Choose the MSI installer and run it."
    Write-Host "3. Add the bin folder (typically C:\Program Files\MongoDB\Tools\100\bin) to your system PATH environment variable."
    Write-Host "4. Restart your PowerShell terminal and run this script again."
    Exit 1
}

# 2. Resolve MONGODB_URI
$envFile = Join-Path $PSScriptRoot "server\.env"
$mongoUri = $env:MONGODB_URI

if (Test-Path $envFile) {
    Write-Host "[INFO] Found server/.env file, extracting connection details..." -ForegroundColor Cyan
    $lines = Get-Content $envFile
    foreach ($line in $lines) {
        if ($line -match "^MONGODB_URI=(.+)$") {
            # Trim potential comments or quotes
            $rawUri = $Matches[1].Split('#')[0].Trim()
            $mongoUri = $rawUri.Trim('"').Trim("'")
            break
        }
    }
}

if (-not $mongoUri) {
    Write-Host "[ERROR] MONGODB_URI environment variable not found in system or server/.env file." -ForegroundColor Red
    Exit 1
}

# 3. Setup paths
$today = Get-Date -Format "yyyy-MM-dd"
$backupDirName = "backup-" + $DbName + "-" + $today
$backupsParentDir = Join-Path $PSScriptRoot "backups"
$targetBackupDir = Join-Path $backupsParentDir $backupDirName
$zipFile = Join-Path $backupsParentDir ($backupDirName + ".zip")

# Ensure backups directory exists
$backupsParentDirExists = Test-Path $backupsParentDir
if (-not $backupsParentDirExists) {
    New-Item -ItemType Directory -Path $backupsParentDir | Out-Null
}

# Clean up existing backup of same name if any
$targetBackupDirExists = Test-Path $targetBackupDir
if ($targetBackupDirExists) {
    Remove-Item -Recurse -Force $targetBackupDir
}
$zipFileExists = Test-Path $zipFile
if ($zipFileExists) {
    Remove-Item -Force $zipFile
}

Write-Host "[START] Starting database backup for database: '$DbName'..." -ForegroundColor Green
Write-Host "[DIR] Output directory: $targetBackupDir" -ForegroundColor Cyan

# 4. Run mongodump
try {
    # Mask password in console print
    $maskedUri = $mongoUri -replace ":[^/@]+@", ":******@"
    Write-Host "[URI] Connecting to: $maskedUri" -ForegroundColor Gray
    
    & mongodump --uri="$mongoUri" --db="$DbName" --out="$targetBackupDir"
    
    if ($LASTEXITCODE -ne 0) {
        throw "mongodump exited with non-zero code $LASTEXITCODE"
    }
}
catch {
    Write-Host "[ERROR] Failed to dump database." -ForegroundColor Red
    Write-Host $_ -ForegroundColor Red
    Exit 1
}

# 5. Compress the output
Write-Host "[COMPRESS] Compressing backup folder..." -ForegroundColor Cyan
try {
    # Compress-Archive is built-in PowerShell 5.0+
    Compress-Archive -Path $targetBackupDir -DestinationPath $zipFile -Force
    Write-Host "[SUCCESS] Compression complete." -ForegroundColor Green
}
catch {
    Write-Host "[ERROR] Failed to compress backup." -ForegroundColor Red
    Write-Host $_ -ForegroundColor Red
    Exit 1
}

# 6. Clean up temporary uncompressed folder
Write-Host "[CLEAN] Cleaning up temporary files..." -ForegroundColor Cyan
Remove-Item -Recurse -Force $targetBackupDir

# 7. Print success
$dateStr = Get-Date -Format "dd-MMM-yyyy HH:mm:ss"
Write-Host ""
Write-Host "[SUCCESS] Database backup completed successfully!" -ForegroundColor Green
Write-Host "[ARCHIVE] Archive Path: $zipFile" -ForegroundColor Cyan
Write-Host "[DATE] Date: $dateStr" -ForegroundColor Gray
