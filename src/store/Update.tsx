import {Place} from "../models/place";
import {SQLiteDatabase} from "expo-sqlite";

export default function Update(database: SQLiteDatabase, place: Place) {
    return new Promise((resolve, reject) => {
        database.transaction(tx => {
            tx.executeSql(`
                UPDATE places 
                    SET title = ?, imageUri = ?, address = ?, latitude = ?, longitude = ? 
                WHERE id = ?;
                `,
                [
                    place.title,
                    place.imageUri,
                    place.address,
                    place.location.latitude,
                    place.location.longitude,
                    place.id // Assuming there is an 'id' property in the Place model
                ],
                (_, result) => {
                    resolve(result);
                    return true;
                },
                (_, error) => {
                    reject(error);
                    return false;
                })
        })
    })

}