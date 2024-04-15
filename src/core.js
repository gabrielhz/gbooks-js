function createConnection() {

    function makeRequest(method, url){ 
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            console.log("[REQUEST] Tentando GET Request a API do Google Books...")
                
            xhr.open(method, url);
            xhr.onload = () => {
                if (xhr.status >= 200 && xhr.status < 300) {
                    let data = JSON.parse(xhr.response);
                    resolve(data);
                } else {
                    reject(new Error(xhr.statusText));
                }
            
            };
                xhr.onerror = () => reject(new Error(xhr.statusText));
                xhr.send()
    })
    }

    async function sendRequest(){
        try {
            let response = await makeRequest('GET', 'https://www.googleapis.com/books/v1/volumes?q=flowers+inauthor:keyes');
            return response;
        } catch (error) {
            throw new Error(error);
        }
        
    }
    
    return {
        sendRequest
    }

}

const core = async () => {
    let connection = createConnection();
    let sendRequest = await connection.sendRequest();
    let parsedData =  parseData(sendRequest);
    let bestRatingBook= parsedData.bestRatingBook();
    console.log(bestRatingBook.bestRating, bestRatingBook.bookID);
}




function parseData(data) {

    function bestRatingBook() {
        let bestRating = 0;
        let bookID = "";

        for (const key in data.items){
            const rating = data.items[key].volumeInfo.averageRating
            const id = data.items[key].id
            if (rating){
                const currentRating = rating
                if (currentRating > bestRating){
                    bestRating = currentRating
                    bookID = id
                }
            }
        }
        return {
            bestRating, 
            bookID
        }
    }
    
    return  {  
        bestRatingBook
    }
}



