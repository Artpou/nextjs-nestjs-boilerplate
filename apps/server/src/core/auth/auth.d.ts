import { providers } from 'db/providers';
import { InferSelectModel } from 'drizzle-orm';
import { Request } from 'fastify';

export interface AuthenticatedRequest extends Request {
  user: {
    id: string;
  };
  provider?: InferSelectModel<typeof providers>;
}
