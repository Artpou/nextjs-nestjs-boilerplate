import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RefreshJwtGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) throw new UnauthorizedException('Invalid token');

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_REFRESH_SECRET,
      });
      request['user'] = payload;
    } catch (error) {
      throw new UnauthorizedException(JSON.stringify(error));
    }

    return true;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private extractTokenFromHeader(request: any) {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Refresh' ? token : undefined;
  }
}
