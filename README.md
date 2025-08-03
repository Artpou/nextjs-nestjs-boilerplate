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

## Apps and Packages

- `server`: A [NestJS](https://nestjs.com/) server application providing the backend API.
- `web`: A [Next.js](https://nextjs.org) web application.
- `@workspace/ui`: A stub React component library used by `web`.
- `@workspace/openapi`: OpenAPI schema and generated API client used by the web application.
- `@workspace/*-config`: Shared configurations for TypeScript, etc.

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

## Getting Started

### Prerequisites

- **[Node.js](https://nodejs.org/)**: Ensure you have Node.js installed (version 20+ recommended).
- **[pnpm](https://pnpm.io/)**: This boilerplate uses pnpm as a package manager.
- **[Docker](https://www.docker.com/)**: Required for database and other services.

### Installation

1. **Clone the repository**:

   ```bash
   git clone <your-repo-url>
   cd <your-repo-directory>
   ```

2. **Install dependencies**:

   ```bash
   pnpm install
   ```

3. **Set up environment variables**:

   - Copy `.env.example` to `.env` in both `apps/web` and `apps/server` directories and configure as needed.

4. **Start Docker services**:

   ```bash
   docker compose up -d
   ```

   This will start PostgreSQL and other required services in the background.

5. **Run the development server**:

   ```bash
   pnpm run dev
   ```

6. **Build for production**:
   ```bash
   pnpm run build
   ```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
