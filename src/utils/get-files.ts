// 引用文件系统模块
const fs = require('fs');
// 引用imageinfo模块
const imageInfo = require('imageinfo');

interface FileType {
    path: string;
    filename: string;
}

function readFileList(path: string, filesList: FileType[]) {
    const files = fs.readdirSync(path);
    files.forEach(function (itm: string) {
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

export const getFiles = {
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
    // 获取非图片文件列表
    getTxtList: function (path: string) {
        return this.getFileList(path).filter((item) => {
            const ms = imageInfo(fs.readFileSync(item.path + item.filename));
            return !ms.mimeType;
        });
    },
};
