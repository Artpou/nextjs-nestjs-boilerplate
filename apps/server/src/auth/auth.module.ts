import { Module } from '@nestjs/common';
import { DrizzleModule } from 'src/drizzle/drizzle.module';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
import { ProviderService } from 'src/provider/provider.service';
import { SpotifyService } from 'src/spotify/spotify.service';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    DrizzleModule,
    UserModule,
    JwtModule.register({
      global: true,
      secret: 'secreeet',
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    UserService,
    ProviderService,
    SpotifyService,
  ],
})
export class AuthModule {}
