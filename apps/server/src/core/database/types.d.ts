import type {
  BuildQueryResult,
  DBQueryConfig,
  ExtractTablesWithRelations,
} from 'drizzle-orm';
import type { Exact } from 'type-fest';

import type * as schema from './schema';

type TSchema = ExtractTablesWithRelations<typeof schema>;

type QueryConfig<TableName extends keyof TSchema> = DBQueryConfig<
  'one' | 'many',
  boolean,
  TSchema,
  TSchema[TableName]
>;

export type Model<
  TableName extends keyof TSchema,
  // biome-ignore lint/complexity/noBannedTypes: need empty object type
  QBConfig extends Exact<QueryConfig<TableName>, QBConfig> = {},
> = BuildQueryResult<TSchema, TSchema[TableName], QBConfig>;
