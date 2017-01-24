import {bot} from "../scripts/_registerAllScripts";

bot("savchenkov", "z 123")
    .then((text: string) => {
        console.log(text);
        process.exit(0);
    })
    .catch((err:string)=>{
        console.error(err);
        process.exit(1);
    });
