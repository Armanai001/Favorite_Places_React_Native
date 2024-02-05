import {SQLiteDatabase} from "expo-sqlite";

export default function Init(database: SQLiteDatabase) {
    return new Promise<void>((resolve, reject) => {
        database.transaction(tx => {
            tx.executeSql(`
            CREATE TABLE IF NOT EXISTS places (
                id INTEGER PRIMARY KEY NOT NULL,
                title TEXT,
                imageUri TEXT ,
                address TEXT ,
                latitude REAL ,
                longitude REAL
            )
        `, [],
                () => {
                    resolve();
                },
                (_, error) => {
                    reject(error);
                    return false;
                }
            );
        });

    });
}
