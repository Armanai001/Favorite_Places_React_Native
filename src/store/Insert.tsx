import {Place} from "../models/place";
import {SQLiteDatabase} from "expo-sqlite";

export default function InsertPlace(database: SQLiteDatabase, place: Place): Promise<number| undefined> {

    return new Promise((resolve, reject) => {
        database.transaction(tx => {
            tx.executeSql(`
            INSERT INTO places 
            (title, imageUri, address, latitude, longitude) 
            VALUES
            (?, ?, ?, ?, ?)
            `, [place.title,
                    place.imageUri,
                    place.address,
                    place.location.latitude,
                    place.location.longitude],
                (_, result) => {
                    resolve(result.insertId);
                    return result.insertId

                },
                (_, error) => {
                    reject(error);
                    return false;
                })
        })
    })

}