import { Command, flags } from '@oclif/command';
import { Template } from '../../libs/templates';
import { TemplateConfig } from '../../utils/constants';

const tpl = new Template(TemplateConfig);

export default class Update extends Command {
    static description = '更新模板';

    static flags = {
        help: flags.help({ char: 'h' }),
    };

    static args = [{ name: 'name', required: true }];

    async run() {
        tpl.update(true);
    }
}
