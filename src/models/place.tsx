export class Place {
    title: string;
    imageUri: string;
    address: string;
    location: mapObject;
    id: string;

    constructor(id: string, title: string, imageUri: string, address: string, location: mapObject) {
        this.title = title;
        this.imageUri = imageUri;
        this.address = address;
        this.location = location;
        this.id = id;
    }

}