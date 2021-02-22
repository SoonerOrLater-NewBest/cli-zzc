import {Command} from '@oclif/command'
import {TaskService} from '../../requests/task'

import {hostname} from 'os'
import chalk from 'chalk'
export default class Advice extends Command {
  static description = 'Shares an advice for you.';

  async run() {
    const name = hostname()
    this.log(`Hello ${name}, 这儿有一些任务等着你去做。\n`)
    const res = await TaskService.getTaskList()
    const arr = res.data.list || []
    if (arr.length <= 0) return this.log('暂无任务')
    // const n = Math.floor((Math.random() * arr.length) + 1) - 1
    // this.log('   ' + chalk.green.italic(`${arr[n].taskName} \n`))
    arr.forEach(({id, taskName, status}) => {
      this.log(
        `${chalk.magenta(id.toString())} ${
          status ? chalk.green('DONE') : chalk.grey('NOT DONE')
        } : ${taskName}`
      )
    })
  }
}
