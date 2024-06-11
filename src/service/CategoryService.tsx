import apiClient from "./ApiClient";

const BASE_URL = 'http://20.163.168.29:8080'

const categoryService = {
    addCategory: (data: {}) => {
        const token = localStorage.getItem('token')
        const res = apiClient.post(`${BASE_URL}/profile/categories`, data, false, token)

        return res
    },
    getAll: () => {
        const token = localStorage.getItem('token')
        const res = apiClient.get(`${BASE_URL}/profile/categories`, token)

        return res
    }
}

export default categoryService