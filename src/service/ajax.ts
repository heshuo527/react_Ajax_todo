type Response<T> = {
    data: T;
    msg: string;
    ret: number
}

const Ajax = <T>(method: string, url: string, data: any) => {
    return new Promise<Response<T>>((resolve, reject) => {
        const xhr = new XMLHttpRequest()
        xhr.open(method, url)
        xhr.setRequestHeader('Content-Type', 'application/json')
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status >= 200 || xhr.status < 300) {
                    let response = xhr.responseText;
                    try {
                        response = JSON.parse(response)
                    } catch (error) {
                        console.error(error);
                        
                    }
                    resolve(response as unknown as Response<T>)
                } else {
                    reject(xhr.status)
                }
            }
        }
        xhr.send(JSON.stringify(data))
    })
}

export default Ajax
