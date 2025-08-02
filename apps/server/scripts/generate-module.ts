#!/usr/bin/env tsx
/* eslint-disable no-console */
import { execSync } from 'child_process';
import { writeFileSync, readFileSync } from 'fs';
import { join } from 'path';

import {
  processTemplate,
  getTemplatePath,
  TemplateVariables,
} from './utils/template-processor';

const name = process.argv[2];

if (!name) {
  console.error('❌ Please provide a module name: pnpm generate <name>');
  process.exit(1);
}

const basePath = `modules/${name}`;
const className = name
  .split('-')
  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
  .join('');
const fileName = name;
const tableName = fileName + 's';

const variables: TemplateVariables = {
  fileName,
  className,
  tableName,
};

try {
  execSync(`nest g module ${basePath}`, { stdio: 'inherit' });
  execSync(`nest g controller ${basePath}`, { stdio: 'inherit' });
  execSync(`nest g service ${basePath}`, { stdio: 'inherit' });

  // Generate model from template
  const modelTemplate = getTemplatePath('module.model.ts.template');
  const modelContent = processTemplate(modelTemplate, variables);
  const modelPath = join('src', basePath, `${fileName}.model.ts`);
  writeFileSync(modelPath, modelContent);

  // Generate service from template
  const serviceTemplate = getTemplatePath('module.service.ts.template');
  const serviceContent = processTemplate(serviceTemplate, variables);
  const servicePath = join('src', basePath, `${fileName}.service.ts`);
  writeFileSync(servicePath, serviceContent);

  // Generate controller from template
  const controllerTemplate = getTemplatePath('module.controller.ts.template');
  const controllerContent = processTemplate(controllerTemplate, variables);
  const controllerPath = join('src', basePath, `${fileName}.controller.ts`);
  writeFileSync(controllerPath, controllerContent);

  // Update db.schema.ts
  const dbSchemaPath = join('src', 'core', 'database', 'db.schema.ts');
  const dbSchemaContent = readFileSync(dbSchemaPath, 'utf8');

  // Add import at the end of imports
  const importLines = dbSchemaContent.split('\n');
  let lastImportIndex = -1;
  for (let i = importLines.length - 1; i >= 0; i--) {
    if (importLines[i].startsWith('import')) {
      lastImportIndex = i;
      break;
    }
  }
  importLines.splice(
    lastImportIndex + 1,
    0,
    `import { ${tableName}, ${fileName}Relations } from '@/modules/${fileName}/${fileName}.model';`,
  );

  // Add to schema object
  const schemaStartIndex = importLines.findIndex((line) =>
    line.includes('export {'),
  );
  if (schemaStartIndex !== -1) {
    // Find the closing brace of schema object
    let braceCount = 0;
    let schemaEndIndex = schemaStartIndex;
    for (let i = schemaStartIndex; i < importLines.length; i++) {
      if (importLines[i].includes('{')) braceCount++;
      if (importLines[i].includes('}')) braceCount--;
      if (braceCount === 0) {
        schemaEndIndex = i;
        break;
      }
    }
    // Add the new table before the closing brace
    importLines.splice(schemaEndIndex, 0, `  ${tableName}: ${fileName}Table,`);
  }

  // Add to exports
  const exportIndex = importLines.findIndex((line) =>
    line.startsWith('export {'),
  );
  if (exportIndex !== -1) {
    const exportLine = importLines[exportIndex];
    const newExportLine = exportLine.replace('};', `, ${fileName}Table };`);
    importLines[exportIndex] = newExportLine;
  }

  const updatedExports = importLines.join('\n');
  writeFileSync(dbSchemaPath, updatedExports);

  console.log(
    `🗄️  Created ${fileName}.model.ts with entityFields and common fields`,
  );
  console.log(`🔧 Created ${fileName}.service.ts with CRUD operations`);
  console.log(`🌐 Created ${fileName}.controller.ts with REST endpoints`);
  console.log(`📝 Updated db.schema.ts with ${tableName}`);
  console.log(`\n✅ Your ${className} module is ready to use!`);
  console.log(`\n⚠️  Don't forget to run: pnpm db:migrate`);
  console.log(
    `   This will create the new '${tableName}' table in your database`,
  );
} catch (err) {
  console.error('❌ Error generating files:', err);
  process.exit(1);
}
