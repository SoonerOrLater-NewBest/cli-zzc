/* eslint-disable @typescript-eslint/interface-name-prefix */
import * as path from 'path';
import * as os from 'os';
import * as fs from 'fs';
import * as shelljs from 'shelljs';

export interface IProps {
    localDir: string;
    origin: string;
    branch?: string;
}

export class LocalGit {
    protected MAIN_DIR: string;

    protected SOURCE_DIR: string;

    protected UTIME_FILE: string;

    private origin: string;

    private branch?: string;

    constructor(props: IProps) {
        const homedir = os.homedir();
        this.origin = props.origin;
        this.branch = props.branch;
        this.MAIN_DIR = path.resolve(homedir, `.cli-zzc/${props.localDir}`);
        this.SOURCE_DIR = path.resolve(this.MAIN_DIR, './source');
        this.UTIME_FILE = path.resolve(this.MAIN_DIR, './utime.log');
    }

    get sourceDir() {
        return this.SOURCE_DIR;
    }

    protected needUpdate(): boolean {
        if (fs.existsSync(this.UTIME_FILE)) {
            return true;
        }
        const uTimestamp = parseInt(fs.readFileSync(this.UTIME_FILE, 'utf8'), 10);
        return Date.now() - uTimestamp > 1000 * 60 * 60 * 2;
    }

    protected createDir() {
        fs.mkdirSync(this.MAIN_DIR, { recursive: true });
        fs.mkdirSync(this.SOURCE_DIR, { recursive: true });
    }

    protected cloneCode() {
        shelljs.exec(`git clone ${this.origin} ${this.SOURCE_DIR}`);
        shelljs.cd(this.SOURCE_DIR);
        if (this.branch) {
            shelljs.exec(`git checkout ${this.branch}`);
        }
        shelljs.cd('-');
    }

    public updateUTime() {
        fs.writeFileSync(this.UTIME_FILE, Date.now().toString());
    }

    public getFileContent(relativePath: string) {
        const absPath = path.resolve(this.SOURCE_DIR, relativePath);
        return fs.readFileSync(absPath, 'utf8');
    }

    public update(force = false) {
        try {
            fs.accessSync(this.SOURCE_DIR);
        } catch (e) {
            this.createDir();
            this.cloneCode();
            this.updateUTime();
            return;
        }
        if (!this.needUpdate() && !force) {
            console.log('jump update');
            return;
        }
        shelljs.cd(this.SOURCE_DIR);
        shelljs.exec('git pull');
        if (this.branch) {
            shelljs.exec(`git checkout ${this.branch}`);
        }
        shelljs.cd('-');
        this.updateUTime();
    }
}
