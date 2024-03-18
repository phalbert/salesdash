# SalesDash

A simple application that demonstrates file upload using streaming.

## Why?

1.  Keep the file on the client end. This is very useful especially in a serverless deployment (Since you are mindful of cost, then if you can keep from saving the file server side, then its good).
2.  Allows us to do things like track progress using the streamed chunks i.e. percentage of completed chunks of total chunks
3.  We could also do advanced operations like pause and resume the upload since we can track which chunk is currently being uploaded.

## Getting Started


### Running with Docker

This is the more convenient option

#### Prerequisites

1. Install Docker [on windows](https://docs.docker.com/get-docker/) or [Ubuntu](https://docs.docker.com/engine/install/ubuntu/)
2. Install [docker-compose](https://docs.docker.com/compose/install/)

#### Commands 

> All these commands should be run from the root folder.

There is only one command to run once you clone the repo

```bash
make all
```

The web app can be loaded at http://localhost:3800

The backend api can be found at http://localhost:3600

It is composed  of the following commands

1. Run the migrations

```bash
make db
```

2. Build the containers

```bash
make build
```

3. Start the containers

```bash
make run
```

### Running Locally

#### Prerequisites

1. Install [node](https://nodejs.org/en/download/)
2. Install [yarn](https://classic.yarnpkg.com/en/)

#### Backend

Navigate to the backend

```bash
cd backend
```

Then run one of the following commands

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```
#### Frontend

Navigate to the frontend

```bash
cd frontend
```

Then run the app on port 3400

```bash
$ yarn dev --port=3400
```

## Architecture
