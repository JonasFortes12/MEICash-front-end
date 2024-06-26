import Transaction from "@/interfaces/Transaction";
import apiClient from "./ApiClient";

const BASE_URL = 'http://20.163.168.29:8080'

const transactionsService = {

    getAll: () => {
        const token = localStorage.getItem('token');
        const res = apiClient.get(`${BASE_URL}/profile/transactions`, token);

        return res
    },

    addTransaction: (data: {}, categoryId: string) => {
        const token = localStorage.getItem('token');
        const res = apiClient.post(`${BASE_URL}/profile/transactions/${categoryId}`, data, undefined, token);

        return res
    },

    deleteTransaction: (id: string) => {
        const token = localStorage.getItem('token');
        const res = apiClient.delete(`${BASE_URL}/profile/transactions/${id}`, token);

        return res
    },

    searchTransaction: (search: string, data: Transaction[]) => {
        return data.filter(objeto => objeto.title.includes(search));
    }
}

export default transactionsService