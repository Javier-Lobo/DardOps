#!/bin/sh
set -eu

docker compose up --build -d
printf '%s\n' "DardOps está disponible en http://localhost:3847"
