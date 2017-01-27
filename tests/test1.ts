import {bot} from "../scripts/_registerAllScripts";
import {matterGetChanelByName} from "../mattermost/matterGetChanelByName";
import {matterClient} from "../start";
import {config} from "../config/config";
import {matterPostMessage} from "../mattermost/matterPostMessage";


matterPostMessage("kurs","test2");

//test1();

async function test1():Promise<void>{
    matterClient.setUrl("http://" + config.matterServerUrl);
    matterClient.useHeaderToken();
    matterClient.enableLogErrorsToConsole(true);
    matterClient.setTeamId(config.team);

    matterClient.login(
        config.botUserName,
        config.botPassword,
        null,
        async function (data: any)  {
            console.log(data.nickname + " подключился", "token", matterClient.token);

            let chId=await matterGetChanelByName("kurs");

            matterClient.createPost({
                    channel_id: chId,
                    message: "test-1",
                    // props://JSON.stringify(`
                    //     {
                    //         "attachments": [
                    //             {
                    //                 "fallback": "test777",
                    //                 "color": "#FF8000",
                    //                 "pretext": "This is optional pretext that shows above the attachment.",
                    //                 "text": price,
                    //                 "author_name": "Mattermost",
                    //                 "author_icon": "http://www.mattermost.org/wp-content/uploads/2016/04/icon_WS.png",
                    //                 "author_link": "http://www.mattermost.org/",
                    //                 "title": "Example Attachment",
                    //                 "title_link": "http://docs.mattermost.com/developer/message-attachments.html",
                    //                 "fields": [
                    //                     {
                    //                         "short": false,
                    //                         "title": "Long Field",
                    //                         "value": "Testing with a very **long** piece of text that will take up the whole width of the table. And then some more text to make it extra long. Testing with a very **long** piece of text that will take up the whole width of the table. And then some more text to make it extra long. Testing with a very **long** piece of text that will take up the whole width of the table. And then some more text to make it extra long."
                    //                     },
                    //                     {
                    //                         "short": true,
                    //                         "title": "Column One",
                    //                         "value": "Testing"
                    //                     },
                    //                     {
                    //                         "short": true,
                    //                         "title": "Column Two",
                    //                         "value": "Testing"
                    //                     },
                    //                     {
                    //                         "short": true,
                    //                         "title": "Column 3",
                    //                         "value": "Testing"
                    //                     },
                    //                     {
                    //                         "short": true,
                    //                         "title": "Column 4",
                    //                         "value": "Testing"
                    //                     },
                    //                     {
                    //                         "short": false,
                    //                         "title": "Another Field",
                    //                         "value": "Testing with a very **long** piece of te up the whole width of the table. And then some more text to make it extra long.g"
                    //                     }
                    //                 ],
                    //                 //"image_url": "http://www.mattermost.org/wp-content/uploads/2016/03/logoHorizontal_WS.png"
                    //             }
                    //         ]
                    //     }
//`)

                },
                (success: any) => {
                    //console.log("success ", success);
                }, (error: any) => {
                    console.error("error ", error);
                });

        },
        function (err: any) {
            console.error(err.message);
        }
    );

}


// bot("savchenkov", "ку")
//     .then((text: string) => {
//         console.log(text);
//         process.exit(0);
//     })
//     .catch((err:string)=>{
//         console.error(err);
//         process.exit(1);
//     });
