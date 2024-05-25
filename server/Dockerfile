FROM node:20-alpine
RUN corepack enable

WORKDIR /app
COPY . /app

RUN pnpm install
RUN pnpm tsc
RUN pnpm run build

# EXPOSE ${PORT}
CMD pnpm start
