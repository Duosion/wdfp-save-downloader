@echo off
setlocal

:: Get the directory path of the batch file
set "BASEPATH=%~dp0"

:: Start mitmproxy is installed in the install directory
start cmd.exe /k "cd /d "%BASEPATH%" && .\mitmproxy.exe -s mitm-redirect.py -p 8080 --set block_global=false --allow-hosts kr.wdfp.kakaogames.com --allow-hosts na.wdfp.kakaogames.com --allow-hosts eu.wdfp.kakaogames.com --allow-hosts sea.wdfp.kakaogames.com"

:: Start the Server
start cmd.exe /k "cd /d "%BASEPATH%" && .\wdfp-save-downloader.exe"

echo Starting both Node.js server and mitmweb...