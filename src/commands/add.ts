import {Command, flags} from '@oclif/command'
import {Todos} from '../db'

export default class Add extends Command {
  static description = 'Add a new todo'

  static flags = {
    task: flags.string({char: 'n', description: 'task'}),
  }

  async run() {
    const {
      flags: {task},
    } = this.parse(Add)
    if (!task) return
    const todo = await Todos.push({
      task,
      id: Todos.value().length,
      done: false,
    }).write()
    this.log(JSON.stringify(todo))
  }
}
