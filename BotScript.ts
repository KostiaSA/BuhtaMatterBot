import {getInstantPromise} from "./utils/getInstantPromise";

export class BotScript {

    constructor(){

    }

    splitMessage(message:string):string[]{
        if (!message)
            return [];
        else
            return message.split(/[\s,.!?]+/);
    }

    isEqual(str1: string, str2: string): boolean {
        if (!str1 || !str2)
            return false;
        else
            return str1.trim().toLowerCase().localeCompare(str2.trim().toLowerCase()) === 0;
    }

    async getReply(userName: string, message: string): Promise<string> {
        return getInstantPromise<string>("");
    }

    async getHelp(userName: string): Promise<string[]> {
        return getInstantPromise<string[]>([]);
    }
}

