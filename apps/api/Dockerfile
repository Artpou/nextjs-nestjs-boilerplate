FROM oven/bun:1 AS builder
# Set working directory
WORKDIR /app
RUN bun add -g turbo
COPY . .
RUN turbo prune --scope=api --docker

FROM oven/bun:1 AS installer
WORKDIR /app
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/bun.lockb ./bun.lockb
COPY --from=builder /app/turbo.json ./turbo.json
COPY --from=builder /app/apps/api/prisma ./prisma
RUN bun install --frozen
RUN bunx prisma generate

FROM oven/bun:1 AS sourcer
WORKDIR /app
COPY --from=installer /app/ .
COPY --from=builder /app/out/full/ .
COPY .gitignore .gitignore
RUN bun run turbo run build --scope=api --include-dependencies --no-deps

FROM oven/bun:1 as runner
WORKDIR /app
COPY --from=sourcer /app/ .
CMD [ "bun", "apps/api/dist/main.js" ]
