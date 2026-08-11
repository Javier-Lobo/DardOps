#!/bin/sh
set -eu

DOCKER_ENGINE_DOCS="https://docs.docker.com/engine/install"

print_macos_install() {
  printf '%s\n' \
    "[ES] Docker no está instalado." \
    "" \
    "macOS:" \
    "  1. Instala Docker Desktop con: brew install --cask docker" \
    "     Sin Homebrew, descárgalo desde:" \
    "     https://docs.docker.com/desktop/setup/install/mac-install/" \
    "  2. Arráncalo con: open -a Docker" \
    "  3. Espera a que Docker Desktop indique que el motor está listo." \
    "  4. Ejecuta de nuevo: ./start.sh" \
    "" \
    "[EN] Docker is not installed." \
    "" \
    "macOS:" \
    "  1. Install Docker Desktop with: brew install --cask docker" \
    "     Without Homebrew, download it from:" \
    "     https://docs.docker.com/desktop/setup/install/mac-install/" \
    "  2. Start it with: open -a Docker" \
    "  3. Wait until Docker Desktop reports that the engine is ready." \
    "  4. Run again: ./start.sh"
}

get_linux_install_url() {
  linux_id=""
  if [ -r /etc/os-release ]; then
    . /etc/os-release
    linux_id="${ID:-}"
  fi

  case "$linux_id" in
    ubuntu) printf '%s/ubuntu/\n' "$DOCKER_ENGINE_DOCS" ;;
    debian) printf '%s/debian/\n' "$DOCKER_ENGINE_DOCS" ;;
    fedora) printf '%s/fedora/\n' "$DOCKER_ENGINE_DOCS" ;;
    rhel) printf '%s/rhel/\n' "$DOCKER_ENGINE_DOCS" ;;
    centos) printf '%s/centos/\n' "$DOCKER_ENGINE_DOCS" ;;
    *) printf '%s/\n' "$DOCKER_ENGINE_DOCS" ;;
  esac
}

print_linux_install() {
  install_url="$(get_linux_install_url)"
  current_user="${USER:-$(id -un)}"
  printf '%s\n' \
    "[ES] Docker no está instalado." \
    "" \
    "Linux:" \
    "  1. Sigue 'Install using the repository' para tu distribución:" \
    "     $install_url" \
    "  2. Instala estos paquetes desde el repositorio oficial de Docker:" \
    "     docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin" \
    "  3. Arranca Docker con: sudo systemctl enable --now docker" \
    "  4. Permite usarlo sin sudo con: sudo usermod -aG docker \"$current_user\"" \
    "  5. Cierra sesión, vuelve a entrar y ejecuta de nuevo: ./start.sh" \
    "" \
    "[EN] Docker is not installed." \
    "" \
    "Linux:" \
    "  1. Follow 'Install using the repository' for your distribution:" \
    "     $install_url" \
    "  2. Install these packages from Docker's official repository:" \
    "     docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin" \
    "  3. Start Docker with: sudo systemctl enable --now docker" \
    "  4. Allow non-root access with: sudo usermod -aG docker \"$current_user\"" \
    "  5. Sign out, sign back in and run again: ./start.sh"
}

print_missing_docker() {
  case "$(uname -s)" in
    Darwin) print_macos_install ;;
    Linux) print_linux_install ;;
    *)
      printf '%s\n' \
        "[ES] Docker no está instalado o no está en PATH." \
        "Consulta las instrucciones oficiales: https://docs.docker.com/get-docker/" \
        "" \
        "[EN] Docker is not installed or is not in PATH." \
        "See the official instructions: https://docs.docker.com/get-docker/"
      ;;
  esac
}

print_daemon_help() {
  printf '%s\n' \
    "[ES] Docker está instalado, pero el motor no responde." \
    "[EN] Docker is installed, but the engine is not responding."
  case "$(uname -s)" in
    Darwin)
      printf '%s\n' \
        "[ES] Arranca Docker Desktop con: open -a Docker" \
        "[EN] Start Docker Desktop with: open -a Docker"
      ;;
    Linux)
      current_user="${USER:-$(id -un)}"
      printf '%s\n' \
        "[ES] Arranca el servicio con: sudo systemctl start docker" \
        "Si aparece 'permission denied', ejecuta:" \
        "  sudo usermod -aG docker \"$current_user\"" \
        "y cierra sesión antes de volver a intentarlo." \
        "" \
        "[EN] Start the service with: sudo systemctl start docker" \
        "If 'permission denied' appears, run:" \
        "  sudo usermod -aG docker \"$current_user\"" \
        "and sign out before trying again."
      ;;
    *)
      printf '%s\n' \
        "[ES] Arranca el motor de Docker y vuelve a ejecutar este script." \
        "[EN] Start the Docker engine and run this script again."
      ;;
  esac
}

if ! command -v docker >/dev/null 2>&1; then
  print_missing_docker
  exit 1
fi

if ! docker compose version >/dev/null 2>&1; then
  printf '%s\n' \
    "[ES] Docker está instalado, pero falta Docker Compose v2." \
    "macOS: actualiza Docker Desktop." \
    "Linux: instala el paquete docker-compose-plugin desde el repositorio oficial:" \
    "       $DOCKER_ENGINE_DOCS/" \
    "" \
    "[EN] Docker is installed, but Docker Compose v2 is missing." \
    "macOS: update Docker Desktop." \
    "Linux: install docker-compose-plugin from Docker's official repository:" \
    "       $DOCKER_ENGINE_DOCS/"
  exit 1
fi

if ! docker info >/dev/null 2>&1; then
  print_daemon_help
  exit 1
fi

docker compose up --build -d
printf '%s\n' \
  "[ES] DardOps está disponible en http://localhost:3847" \
  "[EN] DardOps is available at http://localhost:3847"
