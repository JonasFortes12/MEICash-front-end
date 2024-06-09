import apiClient from "./ApiClient";

const BASE_URL = 'http://20.163.168.29:8080'

const categoryService = {
    addCategory: (data: {}) => {
        const res = apiClient.post(`${BASE_URL}/`, data)

        return res
    }
}

export default categoryService