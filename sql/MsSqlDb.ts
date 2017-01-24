import * as sql from "mssql"
import {config} from "../config/config";

export interface ISqlDb {
    sqlServerAddress: string;
    sqlServerInstance: string;
    sqlServerPort: number;
    sqlLogin: string;
    sqlPassword: string;
    sqlDatabase: string;
}


export async function getValueFromSql(db: ISqlDb, sqlBatch: string, columnName: string): Promise<any> {
    return executeSql(db, sqlBatch).then((rows) => {
        return rows[0][0][columnName];
    });
}

export async function executeSql(db: ISqlDb, sqlBatch: string): Promise<any> {
    let options = {instanceName: db.sqlServerInstance} as any;

    let conf: sql.config = {
        //  driver: "msnodesqlv8",
        pool: {
            min: 0,
            max: 150,
            idleTimeoutMillis: 60000 /// не работает
        },
        server: db.sqlServerAddress,
        port: db.sqlServerPort,
        user: db.sqlLogin,
        database: db.sqlDatabase,
        password: db.sqlPassword,
        options: options,
        connectionTimeout: 5000,
        requestTimeout: 0
    }

    let connection = new sql.Connection(conf);

    return connection
        .connect()
        .then(() => {
            let req = new sql.Request(connection);
            req.multiple = true;
            return req.batch(sqlBatch);
        })
        .then((rowsSet: any) => {
            //console.dir(rowsSet);
            return rowsSet;
        });

}
