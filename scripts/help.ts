import {getInstantPromise} from "../utils/getInstantPromise";
import {BotScript} from "../BotScript";


export class Help_script extends BotScript {

    async getReply(userName: string, message: string): Promise<string> {
        let words = message.split(/[\s,.!]+/)
        if (this.isEqual(words[0], "?"))
            return getInstantPromise<string>("список доступных команд");
        else
            return getInstantPromise<string>("");
    }

    async getHelp(userName: string): Promise<string[]> {
        let help = ["|?|посказка|"];

        return getInstantPromise<string[]>(help);
    }
}
