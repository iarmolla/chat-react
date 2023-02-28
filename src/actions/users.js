import axios from 'axios'

export function getUsers() {
    return async (dispatch) => {
        try {
            const response = await axios.get('http://localhost:3030/users')
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
            const response = await axios.get(`http://localhost:3030/users/${query}`)
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
    
}

