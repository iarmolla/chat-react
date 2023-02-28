import axios from 'axios'

export function singIn(user, navigate) {
    return async (dispatch) => {
        try {
            const response = await axios.post('http://localhost:3030/signin', user)
            dispatch(singInSuccess(response.data))
            navigate('/chat')
        } catch (error) {
            dispatch(signInError(error))
        }
    }
}

export function singInSuccess(message) {
    return {
        type: 'LOGIN_USER_SUCCESS',
        message
    }
}

export function signInError(message) {
    return {
        type: 'LOGIN_USER_ERROR',
        message
    }
}