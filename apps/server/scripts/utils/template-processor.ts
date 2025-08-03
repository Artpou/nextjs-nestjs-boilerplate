import { readFileSync } from 'node:fs';
import { join } from 'node:path';

export interface TemplateVariables {
  fileName: string;
  className: string;
  tableName: string;
}

export function processTemplate(
  templatePath: string,
  variables: TemplateVariables,
): string {
  const template = readFileSync(templatePath, 'utf8');

  return template
    .replace(/\{\{fileName\}\}/g, variables.fileName)
    .replace(/\{\{className\}\}/g, variables.className)
    .replace(/\{\{tableName\}\}/g, variables.tableName);
}

export function getTemplatePath(templateName: string): string {
  return join(__dirname, '..', 'templates', templateName);
}
