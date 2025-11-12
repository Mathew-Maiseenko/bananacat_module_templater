import { readdir } from 'fs/promises';
import path from 'path';

export async function findOutputFolder(
  processedPath: string,
  moduleTitle: string
): Promise<string | null> {
  const workingPath = path.join(processedPath, 'src');
  console.log(workingPath);

  async function searchDirectory(currentPath: string): Promise<string | null> {
    try {
      const items = await readdir(currentPath, { withFileTypes: true });

      for (const item of items) {
        if (item.isDirectory()) {
          if (item.name === moduleTitle) {
            return path.join(currentPath, item.name);
          }

          const found = await searchDirectory(
            path.join(currentPath, item.name)
          );
          if (found) {
            return found;
          }
        }
      }
    } catch (error) {
      console.error(`Error accessing directory ${currentPath}:`, error);
      process.exit(1);
    }

    return null;
  }

  const resultPath = await searchDirectory(workingPath);

  if (!resultPath) {
    console.error(`Точка вставки для модуля ${moduleTitle} не была найдена`);
    process.exit(1);
  }

  return resultPath;
}
