FROM node:24-alpine AS base

WORKDIR /app

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN npm install -g pnpm@11.8.0

FROM base AS deps

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile

FROM deps AS build

COPY . .
RUN pnpm run build

FROM base AS production

WORKDIR /app

ENV NODE_ENV=production

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --prod --frozen-lockfile
COPY --chown=node:node --from=build /app/dist ./dist
RUN chown -R node:node /app

USER node

EXPOSE 5001

CMD ["node", "dist/src/main.js"]
