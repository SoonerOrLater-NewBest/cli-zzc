import { Command, flags } from '@oclif/command';
import { Todos } from '../../requests/db';

export default class Remove extends Command {
    static description = `Removes a task by id
...
Removes a task permanently from database by id
`;

    static flags = {
        id: flags.string({ char: 'n', description: 'task id', required: true }),
    };

    async run() {
        const {
            flags: { id },
        } = this.parse(Remove);
        const todo = await Todos.remove({ id: parseInt(id, 10) }).write();
        this.log(JSON.stringify(todo));
    }
}
