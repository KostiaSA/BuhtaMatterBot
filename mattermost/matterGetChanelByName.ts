import {matterClient} from "../start";
export function matterGetChanelByName(chName: string): Promise<string> {

    return new Promise<string>(
        (resolve: (obj: string) => void, reject: (error: string) => void) => {
            matterClient.getChannels(
                (chanels: any[]) => {

                    let chanel = chanels.find((ch: any) => {
                        return ch.display_name === chName || ch.name === chName;
                    });

                    if (chanel) {
                        console.log(chanel.id);
                        resolve(chanel.id);
                    }
                    else
                        reject("не найден канал '" + chName + "'");
                },
                (error: any) => {
                    console.error(error);
                    reject(error);
                });
        });

}

