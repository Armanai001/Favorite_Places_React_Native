import {SQLiteDatabase} from "expo-sqlite";
import * as FileSystem from 'expo-file-system';

export default function Remove(database: SQLiteDatabase, id: string): Promise<boolean> {

    return new Promise((resolve, reject) => {
        database.transaction(tx => {
            tx.executeSql(`
                SELECT imageUri FROM places WHERE id = ?
            `, [id],
                (_, result) => {
                    const imageUri = result.rows.item(0)?.imageUri;
                    imageUri && FileSystem.deleteAsync(imageUri, {idempotent: true})

                    tx.executeSql(`
                        DELETE FROM places WHERE id = ?
                    `, [id],
                        (_, deleteResult) => {
                            resolve(true);
                        },
                        (_, error) => {
                            reject(error);
                            return false;
                        });
                },
                (_, error) => {
                    reject(error);
                    return false;
                });
        });
    });
}
