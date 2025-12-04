@echo off
title Start Projeto

echo === Iniciando BACK-END ===
start "BACK-END" cmd /k "cd /d %~dp0Back-end && npm install && npm start"

echo === Iniciando FRONT-END ===
start "FRONT-END" cmd /k "cd /d %~dp0Front-end && npm run dev"

echo Servidores iniciados!
pause
