import { Command } from 'commander';

export interface CLIArguments {
  moduleTypeName: string;
  moduleTitle: string;
  path: string;
}

export interface CLIOptions {
  verbose?: boolean;
  debug?: boolean;
}

export function setupCLI() {
  const program = new Command();

  program
    .name('module-templater')
    .description('CLI for project modules templates')
    .version('1.0.0')
    .argument(
      '<ModuleTypeName>',
      'project module type like "module" or "features" in FSD'
    )
    //.argument('<ModuleTitle>', 'project path to check')
    .argument('[path]', 'project path to check', process.cwd())
    .option('-v, --verbose', 'enable verbose output')
    .option('-d, --debug', 'enable debug mode')
    .parse();

  const options = program.opts() as CLIOptions;

  const argumentsResult: CLIArguments = {
    moduleTypeName: program.args[0],
    moduleTitle: program.args[1],
    path: program.args[2] || process.cwd(),
  };

  return {
    cli_arguments: argumentsResult,
    options,
    program,
  };
}
