import { Command, flags } from '@oclif/command';
import * as fs from 'fs';
import * as path from 'path';
const imageInfo = require('imageinfo');
const images = require('images');

interface FileType {
    path: string;
    filename: string;
}

function readFileList(path: string, filesList: FileType[]) {
    const files = fs.readdirSync(path);
    files.forEach(function (itm) {
        const stat = fs.statSync(path + itm);
        if (stat.isDirectory()) {
            // 递归读取文件
            readFileList(path + itm + '/', filesList);
        } else {
            // 定义一个对象存放文件的路径和名字
            const obj = {
                path, // 路径
                filename: itm, // 名字
            };
            filesList.push(obj);
        }
    });
}

const getFiles = {
    // 获取文件夹下的所有文件
    getFileList: function (path: string) {
        const filesList: FileType[] = [];
        readFileList(path, filesList);
        return filesList;
    },
    // 获取文件夹下的所有图片
    getImageFiles: function (path: string) {
        const imageList: string[] = [];
        this.getFileList(path).forEach((item) => {
            const ms = imageInfo(fs.readFileSync(item.path + item.filename));
            ms.mimeType && imageList.push(item.filename);
        });
        return imageList;
    },
};

export default class Watermark extends Command {
    static description = '图片批量添加水印';

    static flags = {
        help: flags.help({ char: 'h' }),
        force: flags.boolean({ char: 'f', default: false }),
        write: flags.string({
            char: 'w',
            default: '/saveImg/',
            description: '保存路径用//包裹（默认在同目录下的/saveImg/中）',
        }),
    };

    static args = [
        { name: 'watermarkImgPath', required: true },
        { name: 'imgFilePath', required: true },
    ];

    initDir(dir: string) {
        try {
            fs.rmdirSync(dir);
        } catch (error) {}
        fs.mkdirSync(dir, { recursive: true });
    }

    async run() {
        const { args, flags } = this.parse(Watermark);
        const { watermarkImgPath, imgFilePath } = args;
        const watermarkImg = images(path.resolve(watermarkImgPath));
        const stat = fs.statSync(path.resolve(imgFilePath));
        const saveDir = path.resolve(imgFilePath, '../') + flags.write;
        if (fs.existsSync(saveDir) && !flags.force) {
            this.error('dir already exist; add --force to cover dir');
        }
        this.initDir(saveDir);
        if (stat.isDirectory()) {
            // this.log('批量处理文件夹下的图片');
            const photosPath = path.resolve(imgFilePath) + '/';
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
            const sourceImg = images(imgFilePath);
            const sourceImgName = path.basename(imgFilePath);
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
