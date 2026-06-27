FROM ghcr.io/eikon-dev/stardeck-web-base:latest AS build
WORKDIR /app
ARG API_URL=http://api:3001
ENV API_URL=$API_URL
ARG NEXT_PUBLIC_BOT_ID
ENV NEXT_PUBLIC_BOT_ID=$NEXT_PUBLIC_BOT_ID
COPY apps/web ./apps/web
COPY packages/shared ./packages/shared
RUN pnpm --filter web build

FROM node:22-slim AS production
WORKDIR /app
COPY --from=build /app/apps/web/.next/standalone ./
COPY --from=build /app/apps/web/.next/static ./apps/web/.next/static
COPY --from=build /app/apps/web/public ./apps/web/public
CMD ["node", "apps/web/server.js"]