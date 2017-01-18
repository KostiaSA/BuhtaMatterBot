import {getInstantPromise} from "../utils/getInstantPromise";
import {BotScript} from "../BotScript";
import {registeredBotScripts} from "./_registerAllScripts";


export class Help_script extends BotScript {

    async getReply(userName: string, message: string): Promise<string> {
        let words = message.split(/[\s,.!]+/)
        if (this.isEqual(words[0], "?")) {

            let helpTable: string[] = [];
            for (let i = 0; i < registeredBotScripts.length; i++) {
                let helpStrs = await registeredBotScripts[i].getHelp(userName);
                helpStrs.forEach((item) => {
                    helpTable.push(item);
                });
            }

            let ret = "|команда|описание|\n";
            ret += "|:--|:--|\n";
            helpTable.forEach((item) => {
//                helpTable.push(`|${item[0]}|${item[1]}|` + "\n");
                ret+=item + "\n";
            });

            return getInstantPromise<string>(ret);
        }
        else
            return getInstantPromise<string>("");
    }

    async getHelp(userName: string): Promise<string[]> {
        let help = ["|?|подсказка|"];

        return getInstantPromise<string[]>(help);
    }
}
