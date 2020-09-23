FROM node:12 AS builder
WORKDIR /app
COPY ./package.json ./
RUN yarn
COPY . .
RUN yarn build


FROM node:12-alpine
RUN apk add redis
WORKDIR /app
COPY --from=builder /app ./
CMD ["yarn", "start:prod"]
