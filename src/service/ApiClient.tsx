const apiClient = {

    get: async (url: string, token: string | null) => {
        
        if (token) {
            const resp = await fetch(url, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                },
            })
            return resp.json()
        }

        const resp = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
        return resp
    },

    post: async (url: string, data: {}, login?: boolean, token?: string | null) => {

        if (token) {
            const resp = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                },
                body: JSON.stringify(data)
            })
            return resp
        }

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