# Turborepo Fullstack Boilerplate

This is a fullstack boilerplate using Turborepo, designed to streamline the development of applications with a modern tech stack. It integrates NestJS for the server-side and Next.js for the client-side, along with a suite of tools and libraries to enhance development efficiency and maintainability.

## Features

### Core
- 🚀 **Turborepo**: Efficient monorepo management.
- 🔒 **Strict Mode**: TypeScript strict mode enabled across all packages for enhanced type safety.

### Server
- 🏗️ **NestJS**: A progressive Node.js framework for building efficient, reliable, and scalable server-side applications.
- ⚡ **Fastify**: High performance web framework as the underlying HTTP server for NestJS.
- 🐘 **Database**: Integration with PostgreSQL using Drizzle ORM.
- 🔐 **Authentication**: JWT-based authentication with Passport.
- 💎 **Validation**: Data validation using NestJS Zod.
- 📝 **Logging**: Enhanced logging with NestJS Pino.
- 🛡️ **Security**: Fastify Helmet for security headers.
- 📚 **OpenAPI**: Swagger for API documentation and client generation.

### Web
- ⚛️ **Next.js**: A React framework for production with hybrid static & server rendering, TypeScript support, smart bundling, route pre-fetching, and more.
- 🎨 **Tailwind CSS**: Utility-first CSS framework for styling.
- 👨‍🎨 **DaisyUI**: Component library for Tailwind CSS with beautiful UI components.
- 🔐 **NextAuth.js**: Authentication for Next.js with support for multiple providers and JWT sessions.
- 💎 **Type Safety**: Zod for schema validation.
- 📋 **Form Handling**: React Hook Form for form validation and management.
- 🔄 **React Query**: Powerful data synchronization and state management.

### DevOps & Tools
- 🐳 **Docker Integration**: Containerization with Docker.
- 🐕 **Husky**: Git hooks for code quality and consistency.

## Apps and Packages

- `server`: A [NestJS](https://nestjs.com/) server application providing the backend API.
- `web`: A [Next.js](https://nextjs.org) web application.
- `@repo/ui`: A stub React component library used by `web`.
- `@repo/eslint-config`: Shared ESLint configurations used throughout the monorepo.
- `@repo/typescript-config`: Shared TypeScript configurations used throughout the monorepo.
- `@repo/openapi`: OpenAPI schema and generated API client used by the web application.

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

## Getting Started

### Prerequisites
- **Node.js**: Ensure you have Node.js installed (version 20+ recommended).
- **pnpm**: This boilerplate uses pnpm as a package manager.
- **Docker**: Required for database and other services.

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

4. **Run the development server**:
   ```bash
   pnpm run dev
   ```

5. **Build for production**:
   ```bash
   pnpm run build
   ```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
