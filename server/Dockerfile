FROM node:20-slim AS base

RUN apt-get update -y && apt-get install -y openssl
RUN corepack enable

WORKDIR /app
COPY pnpm-lock.yaml .
RUN pnpm fetch

FROM base AS build

COPY . .

RUN pnpm install -r --offline
RUN pnpm run build

EXPOSE ${PORT}
CMD [ "pnpm", "start" ]
