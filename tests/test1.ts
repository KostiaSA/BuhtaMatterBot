import {bot} from "../scripts/_registerAllScripts";

bot("savchenkov", "ба 1")
    .then((text: string) => {
        console.log(text);
        process.exit(0);
    })
    .catch((err:string)=>{
        console.error(err);
        process.exit(1);
    });
