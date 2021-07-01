import { Command, flags } from '@oclif/command';
import * as fs from 'fs';
import * as path from 'path';
import * as mineType from 'mime-types';

export default class Base64 extends Command {
    static description = '任意文件转换base64编码';

    static flags = {
        help: flags.help({ char: 'h' }),
        write: flags.boolean({
            char: 'w',
            default: false,
            description: '将base64数据写入文件（同输入文件路径）',
        }),
    };

    static args = [{ name: 'filePath', required: true }];

    async run() {
        const { args, flags } = this.parse(Base64);
        const { filePath } = args;

        const file = path.resolve(filePath);
        const data = fs.readFileSync(file);
        const base = Buffer.from(data).toString('base64');
        const base64 = 'data:' + mineType.lookup(file) + ';base64,' + base;
        flags.write && fs.writeFileSync(path.resolve(filePath.replace('.', '-base64.')), base64);
        this.log(`复制后面的base64编码： ${base64}`);
    }
}
