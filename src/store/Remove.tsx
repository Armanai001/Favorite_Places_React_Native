import {SQLiteDatabase} from "expo-sqlite";

export default function Remove(database: SQLiteDatabase, id: string): Promise<boolean> {

    return new Promise((resolve, reject) => {
        database.transaction(tx => {
            tx.executeSql(`
            DELETE FROM places WHERE id = ?
            `, [id],
                (_, result) => {
                    resolve(true)
                },
                (_, error) => {
                    reject(error);
                    return false;
                })
        })
    })
}



