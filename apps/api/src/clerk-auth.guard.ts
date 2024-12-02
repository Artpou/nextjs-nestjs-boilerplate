import clerkClient from '@clerk/fastify';
import { CanActivate, ExecutionContext } from '@nestjs/common';

export class ClerkAuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    console.log('🚀 ~ ClerkAuthGuard ~ canActivate ~ request:', request);
    const token = request.cookies.__session;

    if (!token) {
      return false;
    }

    try {
      await clerkClient.verifyToken(token, {
        jwtKey: process.env.CLERK_JWT_KEY,
        authorizedParties: ['http://localhost:3001', 'api.example.com'], // Replace with your authorized parties
      });

      return true;
    } catch (error) {
      return false;
    }
  }
}
