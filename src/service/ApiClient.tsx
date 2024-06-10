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
    post: async (url: string, data: {}, login: boolean) => {
        const resp = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }) 

        if (login) {return resp.json()}

        return resp
    }
}

const handleResponse = (resp: Response) => { 
    if (resp.status === 0) {
        const error = resp.statusText
        console.log(error)
        throw new Error(error)
    }

    console.log(resp.json())
    return resp.json()
}

export default apiClient