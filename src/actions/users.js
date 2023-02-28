import axios from 'axios'
import { getToken } from '../helpers/getToken'

export function getUsers() {
    return async (dispatch) => {
        try {
            const token = getToken()
            const response = await axios.get('http://localhost:3030/users', { headers: { 'x-access-token': token } })
            dispatch(getUsersSuccess(response.data))
        } catch (error) {
            dispatch(getUsersFailed(error))
        }
    }
}

export function getUsersSuccess(users) {
    return {
        type: 'GET_USERS_SUCCESS',
        users
    }
}

export function getUsersFailed(error) {
    return {
        type: 'GET_USERS_FAILED',
        error
    }
}

export function getUser(query) {
    return async (dispatch) => {
        try {
            const token = getToken()
            const response = await axios.get(`http://localhost:3030/users/${query}`, { headers: { 'x-access-token': token } })
            dispatch(getUserSuccess(response.data))
        } catch (error) {
            dispatch(getUserFailed(error))
        }
    }
}

export function getUserSuccess(users) {
    return {
        type: 'GET_USER_SUCCESS',
        users
    }
}

export function getUserFailed(error) {
    return {
        type: 'GET_USER_FAILED',
        error
    }
}

