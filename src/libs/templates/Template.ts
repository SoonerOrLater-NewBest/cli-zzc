/* eslint-disable valid-jsdoc */
/* eslint-disable unicorn/filename-case */
import * as path from 'path';
import * as glob from 'glob';
import * as fs from 'fs';
import { LocalGit } from '../../utils/local-git';

export class Template extends LocalGit {
    // constructor(props: ILocalGitProps) {
    //     super(props);
    // }

    listDirs(parentDir: string) {
        const absDir = path.resolve(this.SOURCE_DIR, parentDir);
        const files = glob.sync('*/', { cwd: absDir });

        return files.map((f) => f.replace(/\//, ''));
    }

    getTplFiles(group: string, name: string) {
        const absDir = path.resolve(this.SOURCE_DIR, group, name);
        const files = glob.sync('**', { cwd: absDir, absolute: true });
        return files.filter((o) => !o.endsWith('/') && !o.endsWith('package.json'));
    }

    /**
     * 获取文件相对与模板文件夹的相对路径
     * 解决: 模板中存在嵌套目录
     */
    getRelativeFilePath(group: string, name: string, absPath: string) {
        const dirPath = path.resolve(this.SOURCE_DIR, group, name);
        return path.relative(dirPath, absPath);
    }

    getTemplateConfig(group: string, name: string) {
        const packageAbsPath = path.resolve(this.SOURCE_DIR, group, name, 'package.json');
        const packageJson = fs.readFileSync(packageAbsPath, 'utf8');
        return JSON.parse(packageJson);
    }
}
