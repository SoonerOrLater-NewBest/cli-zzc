import { Command, flags } from '@oclif/command';
import * as fs from 'fs';
import * as path from 'path';
const images = require('images');
import { getFiles } from '../../utils/get-files';

export default class Watermark extends Command {
    static description = '图片批量添加水印，支持单文件或文件夹';

    static flags = {
        help: flags.help({ char: 'h' }),
        force: flags.boolean({ char: 'f', default: false }),
        path: flags.string({
            char: 'w',
            default: '/saveImg/',
            description: '保存路径用//包裹（默认在同目录下的/saveImg/中）',
        }),
    };

    static args = [
        { name: 'watermark', required: true },
        { name: 'imgPath', required: true },
    ];

    initDir(dir: string) {
        try {
            fs.rmdirSync(dir);
        } catch (error) {}
        fs.mkdirSync(dir, { recursive: true });
    }

    async run() {
        const { args, flags } = this.parse(Watermark);
        const { watermark, imgPath } = args;
        const watermarkImg = images(path.resolve(watermark));
        const stat = fs.statSync(path.resolve(imgPath));
        const saveDir = path.resolve(imgPath, '../') + flags.path;
        if (fs.existsSync(saveDir) && !flags.force) {
            this.error('dir already exist; add --force to cover dir');
        }
        this.initDir(saveDir);
        if (stat.isDirectory()) {
            // this.log('批量处理文件夹下的图片');
            const photosPath = path.resolve(imgPath) + '/';
            // 获取文件夹下的所有图片
            const photos = getFiles.getImageFiles(photosPath);
            for (let i = 0; i < photos.length; i++) {
                const sourceImg = images(photosPath + photos[i]);
                const sourceImgName = photos[i];
                const sWidth = sourceImg.width();
                const sHeight = sourceImg.height();
                const wmWidth = watermarkImg.width();
                const wmHeight = watermarkImg.height();
                images(sourceImg)
                    // 设置绘制的坐标位置，右下角距离 40px
                    .draw(watermarkImg, sWidth - wmWidth - 40, sHeight - wmHeight - 40)
                    // 保存格式会自动识别
                    .save(saveDir + sourceImgName);
            }
        } else {
            // this.log('处理单张图片');
            const sourceImg = images(imgPath);
            const sourceImgName = path.basename(imgPath);
            const sWidth = sourceImg.width();
            const sHeight = sourceImg.height();
            const wmWidth = watermarkImg.width();
            const wmHeight = watermarkImg.height();
            images(sourceImg)
                // 设置绘制的坐标位置，右下角距离 40px
                .draw(watermarkImg, sWidth - wmWidth - 40, sHeight - wmHeight - 40)
                // 保存格式会自动识别
                .save(saveDir + sourceImgName);
        }
        this.log(`添加水印后的图片保存在： ${saveDir}文件夹下`);
    }
}
