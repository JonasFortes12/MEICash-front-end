import apiClient from "./ApiClient";

const BASE_URL = 'http://20.163.168.29:8080'

const transactionsService = {

    getAll: () => {
        const res = apiClient.get(`${BASE_URL}/transactions`)

        return res
    },
    getById: () => {

    },
    addTransaction: (data: {}) => {
        const res = apiClient.post(`${BASE_URL}/transactions`, data)

        return res
    }
}

export default transactionsService