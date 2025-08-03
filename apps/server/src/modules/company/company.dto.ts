import { createSelectSchema } from 'drizzle-zod';
import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

import { companies } from './company.model';

// Create schema from the table and omit description
const companyWithoutDescriptionSchema = createSelectSchema(companies).omit({
  description: true,
});

export class CompanyWithoutDescriptionDto extends createZodDto(
  companyWithoutDescriptionSchema,
) {}

export type CompanyWithoutDescription = z.infer<
  typeof companyWithoutDescriptionSchema
>;
