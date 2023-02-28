import axios from 'axios'

export function createUserError(error) {
    return {
        type: 'CREATE_USER_FAILED',
        error
    }
}

export function createUser(user, navigate) {
    return async (dispatch) => {
        try {
            const response = await axios.post('http://localhost:3030/signup', user)
            dispatch(createUserSuccess(response.data))
            navigate('/login')
        } catch (error) {
            dispatch(createUserError(error.response.data))
        }
    }
}

export function createUserSuccess(message) {
    return {
        type: 'CREATE_USER_SUCCESS',
        message
    }
}