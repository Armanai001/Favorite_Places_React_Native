import {SQLiteDatabase} from "expo-sqlite";
import {Place} from "../models/place";

export default function FetchDetails(database: SQLiteDatabase, id: string): Promise<Place> {

    return new Promise((resolve, reject) => {
        database.transaction(tx => {
            tx.executeSql(`
            SELECT * FROM places WHERE id = ?
            `, [id],
                (_, result) => {
                    const data = result.rows._array[0];
                    resolve(new Place(data.id, data.title, data.imageUri, data.address, {
                        latitude: data.latitude || null,
                        longitude: data.longitude || null
                    }))
                },
                (_, error) => {
                    reject(error);
                    return false;
                })
        })
    })
}



