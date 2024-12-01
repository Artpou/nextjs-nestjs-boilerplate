const path = require("path");

const apiPath = path.resolve(__dirname, "apps/api");
const webPath = path.resolve(__dirname, "apps/web");

const ciApiPath = path.resolve(__dirname, "out/apps/api");
const ciWebPath = path.resolve(__dirname, "out/apps/web");

module.exports = {
  scripts: {
    prepare: {
      default: `nps prepare.web prepare.api`,
      web: `bun install`,
      api: `nps prepare.docker prisma.migrate.dev`,
      docker: "docker compose up -d",
      ci: {
        web: `npx turbo prune --scope=web && cd out && bun install --frozen`,
        api: `npx turbo prune --scope=api && cd out && bun install --frozen && nps prisma.generate`,
      },
    },
    test: {
      default: `nps test.web test.api`,
      web: `cd ${webPath} && bun test`,
      api: `cd ${apiPath} && bun test`,
      ci: {
        default: `nps test.ci.web test.ci.api`,
        web: `cd ${ciWebPath} && bun test:ci`,
        api: `cd ${ciApiPath} && bun test:ci`,
      },
      watch: {
        default: `nps test.watch.web test.watch.api`,
        web: `cd ${webPath} && bun test:watch`,
        api: `cd ${apiPath} && bun test:watch`,
      },
    },
    prisma: {
      generate: `cd ${apiPath} && bun prisma generate`,
      studio: `cd ${apiPath} && bun prisma studio`,
      migrate: {
        dev: `cd ${apiPath} && bun prisma migrate dev`,
      },
    },
    build: {
      default: "npx turbo run build",
      ci: {
        web: "cd out && bun run build",
        api: "cd out && bun run build",
      },
    },
    docker: {
      build: {
        default: "nps docker.build.web docker.build.api",
        web: `docker build -t web . -f ${webPath}/Dockerfile`,
        api: `docker build -t api . -f ${apiPath}/Dockerfile`,
      },
    },
    dev: "npx turbo run dev",
  },
};
