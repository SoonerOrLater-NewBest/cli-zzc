import {Command, flags} from '@oclif/command'
// import {join} from 'path'
// import {writeFileSync} from 'fs'
// import {getEslintConfig, getFiles, endsWithArray} from './utils/utils'
import flagConfig from '../utils/lint-options'
// import {
//   lintStagedPath,
//   eslintPath,
//   prettierPath,
// } from './utils/path'
export default class Lint extends Command {
  static description = 'describe the command here'

  static flags = flagConfig;

  async lintStaged(flags: any) {
    const {prettier, eslint, fix, format} = flags
    getEslintConfig()

    let eslintCommon = fix ? `${eslintPath} --fix` : eslintPath

    // 增加格式化输出
    if (format !== 'stylish') {
      eslintCommon = `${eslintCommon} -f ${format}`
    }

    const lintstagedrc = {
      ...(prettier && {
        '*.{js,jsx,ts,tsx,less,scss,sass,css}': [
          `${prettierPath} --write`,
          'git add',
        ],
      }),
      ...(eslint && {
        '*{.js,.jsx,.ts,.tsx}': [
          eslintCommon,
          'git add',
        ],
      }),
    }
    const rcPath = join(__dirname, '.lintstagedrc.json')
    writeFileSync(rcPath, JSON.stringify(lintstagedrc))

    try {
      const child = spawn(lintStagedPath, ['-c', rcPath], {stdio: 'inherit'})
      child.on('close', (code: any) => {
          process.exit(code) // eslint-disable-line
      })
    } catch (error) {

    }
  }

  async run() {
    const {args, flags} = this.parse(Lint)
    const {staged, ...rest} = flags
    const {dir} = args
    if (staged) {
      await this.lintStaged(rest)
    } else {
      await this.lint({...rest, dir})
    }
  }
}
