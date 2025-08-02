import { Inject, Injectable } from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import type { DrizzleDB } from '../../database/drizzle/types/drizzle';
import { Entity } from '../model/entity.model';

import { DRIZZLE } from '@/core/database/drizzle/drizzle.module';

@Injectable()
export abstract class EntityService<E extends Entity> {
  protected abstract entity: E;

  constructor(
    @Inject(DRIZZLE) protected readonly db: DrizzleDB,
    protected readonly logger: Logger,
  ) {}

  protected get table(): E['table'] {
    return this.entity.table;
  }
}
