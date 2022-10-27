
const Ajax = (method: string, url: string, data: { task: string } | { done: boolean } | null, callback: Function) => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest()
        xhr.open(method, url)
        xhr.setRequestHeader('Content-Type', 'application/json')
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status >= 200 || xhr.status < 300) {
                    let response = xhr.responseText;
                    response = JSON.parse(response)
                    resolve(response)
                    callback(response)
                } else {
                    reject(xhr.status)
                }
            }
        }
        xhr.send(JSON.stringify(data))
    }).then(value => {
        console.log(value);
    }, reason => {
        console.error(reason);
    })
}

export default Ajax
