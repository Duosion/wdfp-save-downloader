@echo off
setlocal

:: Get the directory path of the batch file
set "BASEPATH=%~dp0"

:: Start the Node.js project
start cmd.exe /k "cd /d "%BASEPATH%" && npm install && npx tsc && npm run start"

:: Check if mitmproxy is installed in the install directory
if exist "C:\Program Files\mitmproxy\bin\mitmproxy.exe" (
    start cmd.exe /k "cd /d "%BASEPATH%" && "C:\Program Files\mitmproxy\bin\mitmproxy.exe" -s mitm-redirect.py -p 8080"
) else (
    start cmd.exe /k "cd /d "%BASEPATH%" && echo mitmproxy is not installed at 'C:\Program Files\mitmproxy'. Install from https://mitmproxy.org"
)

echo Starting both Node.js server and mitmweb...