import { Module } from '@nestjs/common';
import { DrizzleModule } from 'src/drizzle/drizzle.module';

import { ProviderService } from './provider.service';

@Module({
  imports: [DrizzleModule],
  providers: [ProviderService],
  exports: [ProviderService],
})
export class ProviderModule {}
