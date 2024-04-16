import { RequestConnection } from "./request.js";
import { ParseObject, ParseObjects } from "./parse.js"

function CreateCore(){
    console.log('[CreateCore] CreateCore() called');
    const connection = RequestConnection();
    const parsedObjects = ParseObjects();
    const parsedObject = ParseObject(); 

    async function bestAuthorChoice() {
        console.log('[bestAuthorChoice] bestAuthorChoice() called');
        let response = await connection.sendRequest('GET', 'https://www.googleapis.com/books/v1/volumes?q=flowers+inauthor:keyes');
        const betterRateBook = parsedObjects.parseObjectsBetterRating(response);
        response = await connection.sendRequestByID('GET', betterRateBook.bookID);
        const bookInfo = parsedObject.parseObjectInfo(response);
        console.log('[bestAuthorChoice] Success!');
        return bookInfo;
    }

    return {
        bestAuthorChoice
    }
}

export { CreateCore };