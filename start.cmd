@echo off
setlocal
chcp 65001 >nul

where docker >nul 2>&1
if errorlevel 1 goto docker_missing

docker compose version >nul 2>&1
if errorlevel 1 goto compose_missing

docker info >nul 2>&1
if errorlevel 1 goto daemon_unavailable

docker compose up --build -d
if errorlevel 1 goto startup_failed

echo [ES] DardOps está disponible en http://localhost:3847
echo [EN] DardOps is available at http://localhost:3847
exit /b 0

:docker_missing
echo [ES] Docker no está instalado o no está en PATH.
echo.
echo Windows 10/11:
echo   1. Comprueba que WSL 2 está disponible con: wsl --version
echo   2. Si falta, instálalo desde PowerShell como administrador: wsl --install
echo   3. Instala Docker Desktop con: winget install -e --id Docker.DockerDesktop
echo      También puedes descargarlo desde:
echo      https://docs.docker.com/desktop/setup/install/windows-install/
echo   4. Arranca Docker Desktop y espera a que el motor indique que está listo.
echo   5. Abre una terminal nueva y ejecuta otra vez: start.cmd
echo.
echo [EN] Docker is not installed or is not in PATH.
echo.
echo Windows 10/11:
echo   1. Check that WSL 2 is available with: wsl --version
echo   2. If missing, install it from PowerShell as administrator: wsl --install
echo   3. Install Docker Desktop with: winget install -e --id Docker.DockerDesktop
echo      You can also download it from:
echo      https://docs.docker.com/desktop/setup/install/windows-install/
echo   4. Start Docker Desktop and wait until the engine reports that it is ready.
echo   5. Open a new terminal and run again: start.cmd
exit /b 1

:compose_missing
echo [ES] Docker está instalado, pero falta Docker Compose v2.
echo [ES] Actualiza o reinstala Docker Desktop desde:
echo https://docs.docker.com/desktop/setup/install/windows-install/
echo [EN] Docker is installed, but Docker Compose v2 is missing.
echo [EN] Update or reinstall Docker Desktop from:
echo https://docs.docker.com/desktop/setup/install/windows-install/
exit /b 1

:daemon_unavailable
echo [ES] Docker está instalado, pero el motor no responde.
echo [ES] Arranca Docker Desktop, espera a que indique que está listo y ejecuta start.cmd de nuevo.
echo [EN] Docker is installed, but the engine is not responding.
echo [EN] Start Docker Desktop, wait until it reports that it is ready, and run start.cmd again.
exit /b 1

:startup_failed
echo [ES] No se pudo construir o arrancar DardOps. Revisa los mensajes anteriores de Docker.
echo [EN] DardOps could not be built or started. Review Docker's previous messages.
exit /b 1
