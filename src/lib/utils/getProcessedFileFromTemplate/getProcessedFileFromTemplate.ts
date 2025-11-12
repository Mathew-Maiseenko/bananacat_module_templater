import fs from 'fs/promises';
import path from 'path';

import { IProcessedFileParams } from '../../../types/IProcessedFs';

export async function getProcessedFileFromTemplate(
  filePath: string,
  variables: Record<string, string>
): Promise<IProcessedFileParams> {
  const text = await fs.readFile(filePath, 'utf8');
  const errors: string[] = [];

  const replaceVariables = (input: string): string => {
    return input.replace(/{{(\w+)}}/g, (_, variableName) => {
      if (!variables[variableName]) {
        errors.push(`Variable: ${variableName} in ${filePath}`);
        return `{{${variableName}}}`; // или variableName
      }
      return variables[variableName];
    });
  };

  const fileText = replaceVariables(text);

  const originalFileName = path.basename(filePath);
  const processedFileName = replaceVariables(originalFileName);

  return {
    fileText,
    fileName: processedFileName,
    errors,
  };
}
