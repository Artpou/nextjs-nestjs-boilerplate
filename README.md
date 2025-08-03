# Turborepo Fullstack Boilerplate

This boilerplate combines the best of both worlds: Next.js's amazing developer experience and powerful frontend capabilities with NestJS's robust backend architecture. The idea is simple - use Next.js to build beautiful, interactive UIs while having a proper backend that can handle complex business logic, authentication, and database operations with NestJS. All tied together nicely in a Turborepo monorepo.

## Features

### Core
- 🔒 **Strict Mode**: TypeScript strict mode enabled across all packages for enhanced type safety.
- 🚀 **[Turborepo](https://turbo.build/repo)**: Efficient monorepo management.
- 🎯 **[Biome](https://biomejs.dev/)**: Fast and reliable linting and formatting with TypeScript support and consistent code style enforcement.
- 💎 **[Zod](https://zod.dev/)**: Data validation shared between frontend and backend.
### Server
- ⚡ **[NestJS](https://nestjs.com/) with [Fastify](https://www.fastify.io/)**: Up to 2x faster than Express with better overall performance for handling HTTP requests.
- 🐘 **[Drizzle ORM](https://orm.drizzle.team/)**: Integration with PostgreSQL.
- 🔐 **[Passport](https://www.passportjs.org/)**: JWT-based authentication including refresh token.
- 📚 **[OpenAPI](https://swagger.io/specification/)**: Swagger for API documentation and typed routes generation.

### Web
- ⚛️ **[Next.js](https://nextjs.org/)**: SSR, TypeScript support, smart bundling, route pre-fetching, and more.
- 👨‍🎨 **[shadcn/ui](https://ui.shadcn.com/)**: Simple and beautiful UI components for Tailwind CSS.
- 🔐 **[NextAuth.js](https://next-auth.js.org/)**: Custom integration with JWT sessions and backend authentication.
- 📋 **[React Hook Form](https://react-hook-form.com/)**: Form validation and management with Zod.
- 🔄 **[openapi-ts](https://openapi-ts.dev/)**: OpenAPI TypeScript fetch and query generation with type safety.

### DevOps & Tools
- 🐳 **[Docker](https://www.docker.com/)**: Containerization with Docker.
- 🐕 **[Husky](https://typicode.github.io/husky/)**: Git hooks for code quality and consistency.

## Getting Started

### Prerequisites

- **[Node.js](https://nodejs.org/)**: Ensure you have Node.js installed (version 20+ recommended).
- **[pnpm](https://pnpm.io/)**: This boilerplate uses pnpm as a package manager.
- **[Docker](https://www.docker.com/)**: Required for database and other services.

### Installation

You can use the script to initialize the project:

```bash
./scripts/init.sh
```

This will create the necessary files and directories, and set up the project with the correct environment variables.

### Running the project

```bash
pnpm turbo dev
```
