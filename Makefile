SERVICE_NAME := app
RUN := docker-compose run --rm
RUND = $(RUN) --entrypoint python
BUILD := docker build \
	--build-arg BUILDKIT_INLINE_CACHE=1 \
	--cache-from ${SERVICE_NAME}:latest

export DOCKER_BUILDKIT = 1

.PHONY: clean system-packages pip install tests run all


api-deps:
	cd backend && yarn

web-deps:
	cd frontend && yarn

deps: api-deps web-deps

migrate:
	cd backend && npx prisma migrate save --experimental && npx prisma migrate up --experimental

db:
	docker-compose -f docker-compose.migrate.yml up -d

build:
	docker-compose build

run:
	docker-compose up

clean:
	docker-compose down

run-web:
	cd frontend && yarn dev --port=3400

run-api:
	cd backend && yarn start:dev

run:
	docker-compose up

stop:
	docker-compose down

restart: stop run

all: db build run

