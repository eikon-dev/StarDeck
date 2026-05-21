FROM node:22-slim AS base
RUN npm install -g pnpm@10.32.1

FROM base AS build
WORKDIR /app
COPY . .
RUN pnpm install --frozen-lockfile
RUN pnpm --filter api exec prisma generate
RUN pnpm --filter api build

FROM base AS production
WORKDIR /app
COPY --from=build /app/apps/api/dist ./apps/api/dist
COPY . .
RUN pnpm install --frozen-lockfile --prod
RUN pnpm --filter api exec prisma generate
WORKDIR /app/apps/api
CMD ["node", "dist/src/main"]