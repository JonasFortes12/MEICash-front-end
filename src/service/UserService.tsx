import apiClient from "./ApiClient";

const BASE_URL = 'http://20.163.168.29:8080'

const userService = {
    getAll: () => {
        const res = apiClient.get(`${BASE_URL}`)

        return res
    },
    getById: () => {

    },
    createUser: (data: {}) => {
        const res = apiClient.post(`${BASE_URL}/auth/register`, data, false)

        return res
    },
    login: (data: {}) => {
        const res = apiClient.post(`${BASE_URL}/auth/login`, data, true)

        return res
    },
}

export default userService