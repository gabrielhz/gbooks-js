function RequestConnection() {
        console.log('[RequestConnection] RequestConnection() called')
    function makeRequest(method, url){ 
        console.log('[makeRequest] makeRequest() called')
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            console.log(`[makeRequest] Trying ${method} Request em ${url}...`)
                
            xhr.open(method, url);
            xhr.onload = () => {
                if (xhr.status >= 200 && xhr.status < 300) {
                    console.log(`[makeRequest] API loaded with success!`)
                    let data = JSON.parse(xhr.response);
                    resolve(data);
                } else {
                    reject(new Error(xhr.statusText));
                }
            
            };
                xhr.onerror = () => reject(new Error(xhr.statusText));
                xhr.send()
                console.log('[makeRequest] Success!')
    })
    }

    async function sendRequest(method, url){
        console.log('[sendRequest] sendRequest() called');
        try {
            console.log('[sendRequest] Trying to make a request...')
            let response = await makeRequest(method, url);
            //https://www.googleapis.com/books/v1/volumes?q=flowers+inauthor:keyes
            console.log('[sendRequest] Request sent with success!')
            return response;
        } catch (error) {
            error = error.message
            throw new Error(error);
        }
        
    }

    async function sendRequestByID(method, id) {
        console.log('[sendRequestByID] sendRequestByID() called');
        let response = sendRequest(method, `https://www.googleapis.com/books/v1/volumes/${id}`);
        
        console.log('[sendRequestByID] Success!');
        
        return response
    }


    return {
        sendRequest,
        sendRequestByID,
    }
    
}

export { RequestConnection };