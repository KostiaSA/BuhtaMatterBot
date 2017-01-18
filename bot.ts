//export let registeredBotScripts

export async function bot(userName: string, message: string): Promise<string> {
    return new Promise<string>(
        (resolve: (obj: string) => void, reject: (error: string) => void) => {
            resolve("это ответ -> "+message);
        });

}
