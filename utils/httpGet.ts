
let request = require("request");

export async function httpGet(url:string):Promise<string>{

    return new Promise<string>(
        (resolve: (obj: string) => void, reject: (error: string) => void) => {

            request(url, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    //console.log(body);
                    return resolve(body);
                }
                else {
                    //console.error(error);
                    reject(error);
                }
            });
        });

}
