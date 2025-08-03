# Module Generator

This directory contains the template-based module generator for creating new NestJS modules with Drizzle ORM and Zod validation.

## Structure

```
scripts/
├── generate-module.ts          # Main generator script
├── utils/
│   └── template-processor.ts   # Template processing utilities
├── templates/
│   ├── module.model.ts.template
│   ├── module.dto.ts.template
│   ├── module.service.ts.template
│   └── module.controller.ts.template
└── README.md                   # This file
```

## Usage

```bash
# Generate a new module
pnpm generate product

# This will create:
# - modules/product/product.model.ts
# - modules/product/product.dto.ts
# - modules/product/product.service.ts
# - modules/product/product.controller.ts
# - modules/product/product.module.ts
```

## Template Variables

All templates use these variables:

- `{{fileName}}` - The file name (e.g., "product")
- `{{className}}` - The PascalCase class name (e.g., "Product")
- `{{tableName}}` - The database table name (e.g., "products")

## Template Files

### `module.model.ts.template`

- Drizzle table definition with common fields
- Entity class extending base Entity
- TypeScript type exports

### `module.dto.ts.template`

- Zod schema generation with drizzle-zod
- Custom DTO for omitting description field
- TypeScript type exports

### `module.service.ts.template`

- Complete CRUD operations
- Proper error handling
- Type-safe with Entity types

### `module.controller.ts.template`

- REST endpoints (GET, POST, PUT, DELETE)
- Zod validation with @Body() decorators
- Swagger documentation

## Benefits of Template System

1. **Maintainability**: Easy to update templates without touching generator code
2. **Reusability**: Templates can be used for different module types
3. **Consistency**: Ensures all generated modules follow the same pattern
4. **Flexibility**: Easy to add new template variables or modify existing ones
5. **Version Control**: Templates are tracked in git, making changes visible

## Adding New Templates

1. Create a new template file in `templates/`
2. Use `{{variableName}}` for variable substitution
3. Update `template-processor.ts` if new variables are needed
4. Update `generate-module.ts` to use the new template

## Example Generated Module

The generator creates a complete module structure like the company module:

```typescript
// product.model.ts
export const productTable = pgTable('products', {
  ...entityFields,
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
  // ... other fields
});

// product.dto.ts
export class ProductWithoutDescriptionDto extends createZodDto(
  productWithoutDescriptionSchema,
) {}

// product.service.ts
@Injectable()
export class ProductService extends EntityService<ProductEntity> {
  // ... CRUD methods
}

// product.controller.ts
@Controller('products')
export class ProductController {
  // ... REST endpoints
}
```
