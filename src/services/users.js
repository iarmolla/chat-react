import axios from 'axios'
import { getToken } from '../helpers/getToken'

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL
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

const messages = async (room) => {
    return await api.get(`/messages/${room}`)
}

export default {
    getUsers: getUsers,
    getUser: getUser,
    createUser: createUser,
    loginUser: loginUser,
    messages: messages
}