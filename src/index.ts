import { checkProjRequiredStruct, setupCLI } from './lib/initial';
import { getModulesNamesFromConfigDir } from './lib/utils/getModulesListFromConfigDir/getModulesListFromConfigDir';
import { processModuleTemplate } from './lib/utils/processModuleTemplate/processModuleTemplate';

async function main() {
  const { cli_arguments } = setupCLI();

  const { path, moduleTitle, moduleTypeName } = cli_arguments;

  const isProjectStructValid = checkProjRequiredStruct(path);
  if (!isProjectStructValid) {
    process.exit(1);
  }

  const modulesNamesSet = new Set(await getModulesNamesFromConfigDir(path));

  if (!modulesNamesSet.has(moduleTypeName)) {
    console.error(
      `Шаблон для модуля ${moduleTitle} отсувствует в конфигурации!`
    );
    process.exit(1);
  }

  processModuleTemplate(path, moduleTypeName);
}

///////////////////////////////////////////////

if (require.main === module) {
  main();
}
