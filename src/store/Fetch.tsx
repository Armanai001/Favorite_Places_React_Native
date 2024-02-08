import {SQLiteDatabase} from "expo-sqlite";
import {Place} from "../models/place";

export default function FetchPlaces(database: SQLiteDatabase): Promise<Place[]> {

    return new Promise((resolve, reject) => {
        database.transaction(tx => {
            tx.executeSql(`
            SELECT * FROM places
            `, [],
                (_, result) => {
                    const data = result.rows._array.map(item => {
                        return new Place(item.id, item.title, item.imageUri, item.address, {
                            latitude: item.latitude || null,
                            longitude: item.longitude || null
                        })
                    })

                    resolve(data)
                },
                (_, error) => {
                    reject(error);
                    return false;
                })
        })
    })

}