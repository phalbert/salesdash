# SalesDash

A simple application that demonstrates file upload using streaming.

## Why?

1.  Keep the file on the client end. This is very useful especially in a serverless deployment (Since you are mindful of cost, then if you can keep from saving the file server side, then its good).
2.  Allows us to do things like track progress using the streamed chunks i.e. percentage of completed chunks of total chunks
3.  We could also do advanced operations like pause and resume the upload since we can track which chunk is currently being uploaded.

## Getting Started

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
