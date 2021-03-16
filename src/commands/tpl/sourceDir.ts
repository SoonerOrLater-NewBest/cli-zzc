/* eslint-disable unicorn/filename-case */
import { Command } from '@oclif/command';
import { Template } from '../../libs/templates';
import { TemplateConfig } from '../../utils/constants';

const tpl = new Template(TemplateConfig);

export default class SourceDir extends Command {
    static description = '获取模板本地缓存目录';

    static flags = {};

    static args = [];

    async run() {
        this.log(tpl.sourceDir);
    }
}
