
export async function xmlToJson(xml:string):Promise<any>{
    var parseString = require("xml2js").parseString;

    return new Promise<string>(
        (resolve: (obj: string) => void, reject: (error: string) => void) => {

            parseString(xml, function (err, result) {
                if (!err) {
                    try{
                        //console.log("resul1t",result);
                        let xxx=eval(result);
                        //console.log("xxx",xxx);
                        resolve(eval(result));
                    }
                    catch(e){
                        reject(e);
                    }
                }
                else {
                    reject(err);
                }
            });

        });

}
