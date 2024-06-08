import apiClient from "./ApiClient";

const BASE_URL = 'http://20.163.168.29:8080'

const userService = {
    getAll: () => {
        const res = apiClient.get(`${BASE_URL}/users`)

        return res
    },
    getById: () => {

    },
    createUser: (data: {}) => {
        const res = apiClient.post(`${BASE_URL}/users`, data)

        return res
    }
}

export default userService