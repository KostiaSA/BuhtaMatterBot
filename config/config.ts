// export let config = {
//     matterServerUrl: "192.168.0.67:3333",
//     team: "g4zq11indpyt3jsjnjgj1zjtpr",
//     botUserName:"bot-buhta",
//     botPassword:"FA29FA46-7897-4E87-984E-DF9848FFF974",
// }

import {ISqlDb} from "../sql/MsSqlDb";

export let config = {
    matterServerUrl: "192.168.0.72:3000",
    team: "g4zq11indpyt3jsjnjgj1zjtpr",
    botUserName: "bot",
    botPassword: "FF137CBE-D626-4029-BF5D-CDEF6AD1F98A",
}

export let ClientsDb: ISqlDb = {
    sqlServerAddress: "ps-web",
    sqlServerInstance: "sql2014",
    sqlServerPort: 1433,
    sqlLogin: "bot",
    sqlPassword: "sonyk795",
    sqlDatabase: "Клиенты",
}
