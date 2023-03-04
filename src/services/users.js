import axios from 'axios'
import { getToken } from '../helpers/getToken'

const api = axios.create({
    baseURL: 'http://localhost:3030'
});

const getUsers = async () => {
    const token = getToken()
    return await api.get('/users', { headers: { 'x-access-token': token } })
}

const getUser = async (query) => {
    const token = getToken()
    return await api.get(`/users/${query}`, { headers: { 'x-access-token': token } })
}

const createUser = async (user) => {
    return await api.post('/signup', user)
}

const loginUser = async (user) => {
    return await api.post('/signin', user)
}

export default {
    getUsers: getUsers,
    getUser: getUser,
    createUser: createUser,
    loginUser: loginUser
}