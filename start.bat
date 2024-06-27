@echo off
setlocal

:: Get the directory path of the batch file
set "BASEPATH=%~dp0"

:: Start mitmproxy is installed in the install directory
start cmd.exe /k "cd /d "%BASEPATH%" && .\mitmproxy.exe -s mitm-redirect.py -p 8080"

:: Start the Server
start cmd.exe /k "cd /d "%BASEPATH%" && .\wdfp-save-downloader.exe"

echo Starting both Node.js server and mitmweb...