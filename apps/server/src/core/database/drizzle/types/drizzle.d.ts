import { NodePgDatabase } from 'drizzle-orm/node-postgres';

import { schema } from '@/core/database/db.schema';

export type DrizzleDB = NodePgDatabase<typeof schema>;
