const apiClient = {
    get: async (url: string) => {
        console.log('ola')
        const resp = await fetch(url, {
            method: 'GET',
            headers: {},
        })

        console.log(resp)
        return handleResponse(resp)
    },
    post: async (url: string, data: {}) => {
        const resp = await fetch(url, {
            method: 'POST',
            headers: {},
            body: JSON.stringify(data)
        }) 
        return handleResponse(resp)
    }
}

const handleResponse = (resp: Response) => { 
    console.log(resp.status)
    console.log(resp.status != 200 )
    if (resp.status === 0) {
        const error = resp.statusText
        console.log(error)
        throw new Error(error)
    }

    console.log(resp.json())
    return resp.json()
}

export default apiClient