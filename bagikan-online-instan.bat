@echo off
title Bagikan Online Instan - Hadir Mobile App
cd /d "%~dp0"
echo ========================================================
echo  Membuka Akses Publik Internet untuk Aplikasi Hadir
echo ========================================================
echo.
echo Pastikan aplikasi sudah jalan (npm.cmd run dev di terminal lain).
echo Sedang membuat link HTTPS publik yang bisa dibuka semua orang...
echo.
npx --yes localtunnel --port 3000
pause
