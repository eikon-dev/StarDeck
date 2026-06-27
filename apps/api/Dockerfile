FROM ghcr.io/eikon-dev/stardeck-api-base:latest AS build
WORKDIR /app
COPY apps/api ./apps/api
COPY packages/shared ./packages/shared
RUN pnpm --filter api build

FROM ghcr.io/eikon-dev/stardeck-api-base:latest AS production
WORKDIR /app
COPY --from=build /app/apps/api/dist ./apps/api/dist
WORKDIR /app/apps/api
CMD ["node", "dist/src/main"]