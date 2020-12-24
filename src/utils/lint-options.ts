import {flags} from '@oclif/command'

const flagConfig = {
  staged: flags.boolean({
    char: 'S',
    default: false,
    description: 'only lint git staged files',
  }),
  prettier: flags.boolean({
    char: 'P',
    default: false,
    description: 'format code with prettier',
  }),
  eslint: flags.boolean({
    char: 'e',
    default: false,
    description: 'enabel lint javascript',
  }),
  fix: flags.boolean({
    char: 'f',
    default: false,
    description: 'fix all eslint and stylelint auto-fixable problems',
  }),
  cwd: flags.string({
    char: 'c',
    default: process.cwd(),
    description: 'current working directory',
  }),
  format: flags.string({
    char: 'F',
    default: 'stylish',
    description: 'output format of console',
  }),
}

export default flagConfig
