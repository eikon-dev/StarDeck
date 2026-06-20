FROM node:22-slim AS base
RUN npm install -g pnpm@10.32.1

FROM base AS deps
WORKDIR /app
COPY pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/web/package.json ./apps/web/
COPY packages/shared/package.json ./packages/shared/
RUN pnpm install --frozen-lockfile

FROM base AS build
WORKDIR /app
ARG API_URL=http://api:3001
ENV API_URL=$API_URL
ARG NEXT_PUBLIC_BOT_ID
ENV NEXT_PUBLIC_BOT_ID=$NEXT_PUBLIC_BOT_ID
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/apps/web/node_modules ./apps/web/node_modules
COPY . .
RUN pnpm --filter web build

FROM base AS production
WORKDIR /app
COPY --from=build /app/apps/web/.next/standalone ./
COPY --from=build /app/apps/web/.next/static ./apps/web/.next/static
COPY --from=build /app/apps/web/public ./apps/web/public
CMD ["node", "apps/web/server.js"]