import { readdir } from 'fs/promises';
import path from 'path';

import { __CONFIG_DIR_NAME__ } from '../../../const';
import { IProcessedDirParams } from '../../../types/IProcessedFs';
import { getProcessedFileFromTemplate } from '../getProcessedFileFromTemplate/getProcessedFileFromTemplate';

export async function processModuleTemplate(
  projectPath: string,
  moduleTypeName: string,
  variables: Record<string, string> = {}
) {
  const templatesConfigPath = path.join(projectPath, __CONFIG_DIR_NAME__);

  const moduleTemplatePath = path.join(templatesConfigPath, moduleTypeName);

  async function processDirFromModuleTemplate(dirPath: string) {
    const currentDir: IProcessedDirParams = {};
    const dirInners = await readdir(dirPath, {
      withFileTypes: true,
    });

    for (const node of dirInners) {
      const innerNodePath = path.join(dirPath, node.name);

      if (node.isDirectory()) {
        currentDir[node.name] = await processDirFromModuleTemplate(
          innerNodePath
        );
      } else if (node.isFile()) {
        currentDir[node.name] = await getProcessedFileFromTemplate(
          innerNodePath,
          variables
        );
      }
    }

    return currentDir;
  }

  const resultFileSystem: IProcessedDirParams =
    await processDirFromModuleTemplate(moduleTemplatePath);

  console.log(resultFileSystem);

  return resultFileSystem;
  // const filesInConfigDir = await readdir(moduleTemplatePath, {
  //   withFileTypes: true,
  // });
}
