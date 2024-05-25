FROM node:20-alpine
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /app
COPY . /app

RUN pnpm install --prod --frozen-lockfile
RUN pnpm run build

# EXPOSE ${PORT}
CMD pnpm start
