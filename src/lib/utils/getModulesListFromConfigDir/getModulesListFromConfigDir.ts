import fs from 'fs';
import path from 'path';

import { __CONFIG_DIR_NAME__ } from '../../../const';

export async function getModulesNamesFromConfigDir(projectPath: string) {
  try {
    const configDirPath = path.join(projectPath, __CONFIG_DIR_NAME__);

    const filesInConfigDir = await fs.promises.readdir(configDirPath, {
      withFileTypes: true,
    });

    return filesInConfigDir.reduce((acc, file) => {
      if (file.isDirectory()) {
        return [...acc, file.name];
      } else {
        return acc;
      }
    }, [] as string[]);
  } catch (error) {
    console.error(`Ошибка при чтении директории конфигурации: ${error}`);
    process.exit(1);
  }
}
