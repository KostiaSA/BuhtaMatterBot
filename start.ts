import Client from "./client";
import WebSocketClient from "./websocket_client";
import {config} from "./config/config";
import {bot} from "./scripts/_registerAllScripts";


export const matterClient = new Client();
const webSocketClient = new WebSocketClient();

matterClient.setUrl("http://" + config.matterServerUrl);
matterClient.useHeaderToken();
matterClient.enableLogErrorsToConsole(true);
matterClient.setTeamId(config.team);

matterClient.login(
    config.botUserName,
    config.botPassword,
    null,
    (data: any) => {
        console.log(data.nickname + " подключился", "token", matterClient.token);


        webSocketClient.reconnectCallback = () => {
            webSocketClient.sendMessage("authentication_challenge", {token: matterClient.token}, (result: any) => {
                if (result.status === "OK") {
                    console.log("websocket connect Ok");
                    console.log(data.nickname + " готов к работе, ждем запросов");
                    //console.log(result);
                }
            });
        };

        webSocketClient.eventCallback = (msg: any) => {
            try {
                if (msg.event === "posted") {
                    let post = JSON.parse(msg.data.post);

                    if (msg.data.sender_name !== config.botUserName) {
                        console.log("запрос от " + msg.data.sender_name + ": " + post.message);

                        //console.log(matterClient);
                        bot(msg.data.sender_name, post.message)
                            .then((reply: string) => {

                                matterClient.createPost({
                                        channel_id: post.channel_id,
                                        message: reply

                                    },
                                    (success: any) => {
                                        //console.log("success ", success);
                                    }, (error: any) => {
                                        console.error("error ", error);
                                    });

                            })
                            .catch((err: string) => {

                                matterClient.createPost({
                                        channel_id: post.channel_id,
                                        message: err

                                    },
                                    (success: any) => {
                                        //console.log("success ", success);
                                    }, (error: any) => {
                                        console.error("error ", error);
                                    });

                            });


                    }

                }
            }
            catch (e) {
                console.error(e);
            }

        };

        webSocketClient.initialize("ws://" + config.matterServerUrl + "/api/v3/users/websocket");

    },
    function (err: any) {
        console.error(err.message);
    }
);

//console.log("buhta matter bot started");
