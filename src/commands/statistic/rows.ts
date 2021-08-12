import { Command, flags } from '@oclif/command';
import * as fs from 'fs';
import * as path from 'path';
import { getFiles } from '../../utils/get-files';
import chalk from 'chalk';

export default class Rows extends Command {
    static description = '统计文件行数';

    static flags = {
        help: flags.help({ char: 'h' }),
        write: flags.boolean({ char: 'w', default: false, description: '是否将文件信息写入文件' }),
        path: flags.string({
            char: 'p',
            default: '/fileInfo/',
            description: '保存路径用//包裹（默认在同目录下的/fileInfo/中）',
        }),
        trim: flags.boolean({ char: 't', default: false, description: '是否去除空行' }),
    };

    static args = [
        { name: 'filePath', required: true },
        {
            name: 'ignore',
            default: ['.lock', '.DS_Store'],
            description: '过滤文件后缀',
        },
    ];

    initDir(dir: string) {
        const dirState = fs.existsSync(dir); // 判断目录是否存在
        if (!dirState) {
            fs.mkdirSync(dir); // 创建目录
        }
    }

    async run() {
        const { args, flags } = this.parse(Rows);
        const { filePath, ignore } = args;
        const stat = fs.statSync(path.resolve(filePath));
        const saveDir = path.resolve(filePath, '../') + flags.path;
        const saveTxt = path.resolve(saveDir, './countLine.txt');
        if (flags.write) {
            this.initDir(saveDir);
        }
        let total = 0;
        if (stat.isDirectory()) {
            // this.log('批量处理文件夹下的非图片文件');
            const filesPath = path.resolve(filePath) + '/';
            // 获取文件夹下的所有非图片文件
            const files = getFiles.getTxtList(filesPath).filter((f) => {
                const ext = path.extname(f.filename);
                // 过滤掉一切无效文件，如.DS_Store的后缀为空
                return !ignore.includes(ext) && !ignore.includes(f.filename);
            });
            files.forEach(function (item) {
                let cData = '';
                const file = item.path + item.filename;
                const content = fs.readFileSync(file);
                const fileStr = content.toString('utf8');
                let lines = fileStr.split('\n').length;
                if (flags.trim) {
                    lines = fileStr
                        .replace(/ /g, '')
                        .split('\n')
                        .filter((s) => s !== '').length;
                }
                total += lines;
                if (flags.write) {
                    const state = fs.existsSync(saveTxt);
                    if (state) {
                        cData = fs.readFileSync(saveTxt).toString('utf-8'); // 同步读取统计文件内容
                    } else {
                        fs.createWriteStream(saveTxt);
                    }
                    cData = cData + file + '  ' + lines + '\n';
                    fs.writeFileSync(saveTxt, cData);
                }
            });
        } else {
            let cData = '';
            const content = fs.readFileSync(filePath);
            const fileStr = content.toString('utf8');
            let lines = fileStr.split('\n').length;
            if (flags.trim) {
                lines = fileStr
                    .replace(/ /g, '')
                    .split('\n')
                    .filter((s) => s !== '').length;
            }
            total += lines;
            if (flags.write) {
                const state = fs.existsSync(saveTxt);
                if (state) {
                    cData = fs.readFileSync(saveTxt).toString('utf-8'); // 同步读取统计文件内容
                } else {
                    fs.createWriteStream(saveTxt);
                }
                cData = cData + filePath + '  ' + lines + '\n';
                fs.writeFileSync(saveTxt, cData);
            }
        }
        this.log(`本次检测到文件行数共：${chalk.green(String(total))} 行`);
        if (flags.write) {
            this.log(`详细文件信息：${chalk.green(saveTxt)}`);
        }
    }
}
