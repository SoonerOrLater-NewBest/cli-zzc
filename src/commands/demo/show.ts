import {Command, flags} from '@oclif/command'
import chalk from 'chalk'
import {Todos} from '../../libs/db'
export default class Show extends Command {
static description = `Shows existing tasks
...
Show all the tasks sorted by their ids
`;

async run() {
  const todos = await Todos.sortBy('id').value()
  todos.forEach(({id, task, done}) => {
    this.log(
      `${chalk.magenta(id.toString())} ${
        done ? chalk.green('DONE') : chalk.grey('NOT DONE')
      } : ${task}`
    )
  })
}
}
