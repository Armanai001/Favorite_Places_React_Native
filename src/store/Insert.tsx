import {Place} from "../models/place";
import {SQLiteDatabase} from "expo-sqlite";

export default function InsertPlace(database: SQLiteDatabase, place: Place) {

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
                    resolve(result);
                    return true;
                },
                (_, error) => {
                    reject(error);
                    console.log('err')
                    return false;
                })
        })
    })

}