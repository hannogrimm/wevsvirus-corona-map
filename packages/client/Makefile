secrets := $(shell cat .env | sed 's/\n/ /g')

docker-build:
	docker build -t wirvsvirus_client .

docker-run:
	docker run -it -p 3000:3000 -e $(secrets) wirvsvirus_client