import { Command, flags } from '@oclif/command';
import * as inquirer from 'inquirer';
import * as fs from 'fs';
import * as path from 'path';
import * as ejs from 'ejs';
import { Template } from '../../libs/templates';
import { TemplateConfig, UiOptions } from '../../utils/constants';

const tpl = new Template(TemplateConfig);

export default class Load extends Command {
    static description = '使用模板';

    static flags = {
        help: flags.help({ char: 'h' }),
        force: flags.boolean({ char: 'f', default: false }),
        group: flags.string({ char: 'g', default: UiOptions[0], options: UiOptions }),
    };

    static args = [{ name: 'name', required: true }];

    getVariables(group: string, name: string) {
        const questions = tpl.getTemplateConfig(group, name).variables;
        return inquirer.prompt(questions);
    }

    initDir(dir: string) {
        try {
            fs.rmdirSync(dir);
        } catch (e) {}
        fs.mkdirSync(dir, { recursive: true });
    }

    async run() {
        const { args, flags } = this.parse(Load);
        const { name } = args;
        const { group } = flags;
        const files = tpl.getTplFiles(group, name);
        const variables = (await this.getVariables(group, name)) as { name: string };

        this.debug(`fags: ${flags}, args: ${args}`);
        this.debug('variables:', variables);

        const { withoutDirectory } = tpl.getTemplateConfig(group, name);
        let destDir: string;
        const cwd = process.cwd();
        if (withoutDirectory) {
            destDir = cwd;
        } else {
            destDir = path.resolve(cwd, variables.name);
        }

        if (fs.existsSync(destDir) && !flags.force && !withoutDirectory) {
            this.error('dir already exist; add --force to cover dir');
        }

        this.initDir(destDir);

        files.forEach((f: string | number | Buffer | import('url').URL) => {
            const regex = new RegExp(`\\b${name}\\b`, 'g');
            const createFile = tpl
                .getRelativeFilePath(group, name, f)
                .replace(regex, variables.name);
            this.debug(`originFile: ${f}, newFile: ${createFile}`);
            const content = fs.readFileSync(f, 'utf8');
            fs.writeFileSync(
                path.resolve(destDir, createFile),
                ejs.render(content, variables).replace(regex, variables.name),
                { encoding: 'utf8', flag: 'w' }
            );
        });
    }
}
