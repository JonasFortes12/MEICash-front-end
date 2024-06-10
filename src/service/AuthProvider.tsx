const authProvider = {
    checkAuth: () => {
        const token = localStorage.getItem('token')

        if (token) {
            return true
        }

        return false
    },
    login: (token: string) => {
        localStorage.setItem('token', token)
    },
    logout: () => {
        localStorage.removeItem('token')
    }
}

export default authProvider