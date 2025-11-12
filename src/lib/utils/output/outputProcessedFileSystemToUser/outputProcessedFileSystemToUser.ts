import fs from 'fs/promises';
import path from 'path';

import {
  IProcessedDirParams,
  IProcessedFileParams,
  ProcessedFSNode,
} from '../../../../types/IProcessedFs';
import { findOutputFolder } from '../findOutputFolder/findOutputFolder';

export async function outputProcessedFileSystemToUser(
  processedSchema: IProcessedDirParams,
  processedPath: string,
  moduleTitle: string,
  moduleTypeName: string
) {
  const modulesSameTypeNameFolder = await findOutputFolder(
    processedPath,
    moduleTypeName
  );

  const outputFolderPath = path.join(modulesSameTypeNameFolder, moduleTitle);

  async function constructModuleFileSystemFromProcessedSchema(
    schema: IProcessedDirParams,
    currentPath: string
  ) {
    await fs.mkdir(currentPath, { recursive: true });

    for (const [nodeName, nodeConfig] of Object.entries(schema)) {
      const newNodePath = path.join(currentPath, nodeName);
      if (isProcessedDir(nodeConfig)) {
        await constructModuleFileSystemFromProcessedSchema(
          nodeConfig,
          newNodePath
        );
      } else if (isProcessedFile(nodeConfig)) {
        await fs.writeFile(newNodePath, nodeConfig.fileText, 'utf8');
      }
    }
  }

  // Запускаем построение файловой системы
  await constructModuleFileSystemFromProcessedSchema(
    processedSchema,
    outputFolderPath
  );
}

export function isProcessedFile(
  node: ProcessedFSNode
): node is IProcessedFileParams {
  return (
    node &&
    typeof node.fileText === 'string' &&
    typeof node.fileName === 'string' &&
    Array.isArray(node.errors)
  );
}

export function isProcessedDir(
  node: ProcessedFSNode
): node is IProcessedDirParams {
  return node && typeof node === 'object' && !isProcessedFile(node);
}
