import { Command, flags } from '@oclif/command';
import { Template } from '../../libs/templates';
import { TemplateConfig, UiOptions } from '../../utils/constants';

const tpl = new Template(TemplateConfig);

export default class List extends Command {
    static description = '展示模板列表';

    static flags = {
        help: flags.help({
            char: 'h',
            description: `选择模版框架：${UiOptions.toString()}`,
        }),
    };

    static args = [
        {
            name: 'group',
            options: UiOptions,
            default: UiOptions[0],
        },
    ];

    async run() {
        const { args } = this.parse(List);
        const { group } = args;
        tpl.update();
        const dirs = tpl.listDirs(group);
        const tplInfos = dirs.map((name: string) => {
            const json = tpl.getTemplateConfig(group, name);
            return `${(name + ' '.repeat(30)).slice(0, 30)}${json.description || ''}`;
        });
        super.log('查找到模板: \n' + tplInfos.join('\n'));
    }
}
