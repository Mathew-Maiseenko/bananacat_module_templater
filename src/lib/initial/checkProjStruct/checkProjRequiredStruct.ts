import fs from 'fs';
import path from 'path';

import { __CONFIG_DIR_NAME__ } from '../../../const';

export function checkProjRequiredStruct(projectPath: string): boolean {
  const errors: string[] = [];
  const requiredDirs = ['src', __CONFIG_DIR_NAME__];

  requiredDirs.forEach((dir) => {
    const fullPath = path.join(projectPath, dir);
    if (!fs.existsSync(fullPath)) {
      errors.push(`Структура проекта не содержит дирректорию "${dir}"!`);
      console.error(`Структура проекта не содержит дирректорию "${dir}"!`);
    }
  });

  if (errors.length) {
    return false;
  }

  return true;
}
