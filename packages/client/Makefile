secrets := $(shell cat .env | sed 's/\n/ /g')

docker-build:
	cd ../.. && yarn
	yarn build
	docker build -t eliaswolf/corolation-client .

docker-run:
	docker run --rm -it -p 3000:3000 -e $(secrets) eliaswolf/corolation-client