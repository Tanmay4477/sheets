FROM node:alpine

WORKDIR /app

RUN npm install -g pnpm

COPY ./package.json .
COPY ./pnpm-lock.yml .
COPY pnpm-workspace.yaml .

RUN pnpm install
COPY turbo.json .
COPY packages .
COPY apps/websocket .

