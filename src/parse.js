function ParseObject(){
    console.log('[ParseObject] ParseObject() called')
    function parseObjectInfo(data){

    console.log('[ParseObjectInfo] ParseObjectInfo() called')
    if (!data) {
        throw new Error('[ParseObjectInfo] No data to parse')
    }
    console.log('[ParseObjectInfo] Successfully parsing data!')
        return {
            name: data.volumeInfo?.title,
            authors: data.volumeInfo?.authors,
            publisher: data.volumeInfo?.publisher,
            publishedDate: data.volumeInfo?.publishedDate,
            image: data.volumeInfo?.imageLinks?.small,
            link: data.volumeInfo?.infoLink,
            lang: data.volumeInfo?.language ,
            price: data.saleInfo?.listPrice?.amount,
            currency: data.saleInfo?.listPrice?.currencyCode,
        }

    }

    return  {  
        parseObjectInfo
    }
}

function ParseObjects() {
    console.log('[ParseObjects] ParseObjects() called')
    
    function parseObjectsBetterRating(data) {
        console.log('[ParseObjectsBetterRating] ParseObjectsBetterRating() called')
        let betterRating = 0;
        let bookID = "";

        console.log('[ParseObjectsBetterRating] Parsing data...')
        for (const key in data.items){
            const rating = data.items[key].volumeInfo.averageRating
            const id = data.items[key].id
            if (rating){
                const currentRating = rating
                if (currentRating > betterRating){
                    betterRating = currentRating
                    bookID = id
                }
            }
        }
        console.log(`[ParseObjectsBetterRating] Successfully ${bookID} rated ${betterRating} parsed!`)
        return {
            betterRating, 
            bookID
        }
    }

    
    return  {  
        parseObjectsBetterRating
    }
}

export { ParseObject, ParseObjects };