import c from "picocolors";

const display = (type: string, data: string) => {
    console.log(`[ ${type} ] ${c.gray(currentTime())} ${data}`);
}

const currentTime = () => {
    const date: Date = new Date();
    return `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
}

const pad = (num: number) => num.toString().padStart(2, '0');

const logMessage = (level: string, data: string, from?: string) => {
    const format = from ? c.gray(from+': ') : '';
    display(level, format + data);
}

export default {
    log(data: string, from?: string) {
        logMessage(c.cyan('LOG'), data, from);
    },
    
    warn(data: string, from?: string) {
        logMessage(c.yellow('WRN'), data, from);
    },
    
    error(data: string, from?: string) {
        logMessage(c.red('ERR'), data, from);
    },
    
    debug(data: string, from?: string) {
        logMessage(c.blue('DBG'), data, from);
    }
}
