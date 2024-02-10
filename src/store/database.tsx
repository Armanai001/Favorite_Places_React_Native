import * as SQLite from 'expo-sqlite';
import Init from "./Init";
import InsertPlace from "./Insert";
import {Place} from "../models/place";
import FetchPlaces from "./Fetch";
import FetchDetails from "./FetchDetails";
import Remove from "./Remove";
import Update from "./Update";

const database = SQLite.openDatabase('places.db');


// Initialize database
const init = Init(database)


// Insert into database
function insert(data: Place) {
    return InsertPlace(database, data)
}


// Fetch Places
function fetchData(): Promise<Place[]> {
    return FetchPlaces(database)
}


// Fetch Details
function fetchDetails(id: string): Promise<Place> {
    return FetchDetails(database, id)
}


// Remove place
function remove(id: string): Promise<boolean> {
    return Remove(database, id);
}


// Update place
function updatePlace(place: Place) {
    return Update(database, place)
}


export {init, insert, fetchData, fetchDetails, remove, updatePlace}