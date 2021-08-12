import chalk from 'chalk';

class Log {
    public success(msg: string): void {
        console.log(chalk.green(msg));
    }

    public error(msg: string): void {
        console.log(chalk.red(msg));
    }

    public info(msg: string): void {
        console.log(chalk.blue(msg));
    }

    public highlight(msg: string): void {
        console.log(chalk.whiteBright(msg));
    }
}

export const log = new Log();
