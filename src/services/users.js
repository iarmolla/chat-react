import axios from 'axios'

export const getUsers = async () => {
    return axios.get('http://localhost:3030/users')
}

export const createUser = async (user) => {
    const response = await axios.post('http://localhost:3030/signup', user)
}