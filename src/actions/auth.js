import api from '../services/users'

export function singIn(user, navigate) {
    return async (dispatch) => {
        try {
            const response = await api.loginUser(user)
            window.localStorage.setItem('email',user.email)
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

export function removeMessages() {
    return {
        type: 'REMOVE_MESSAGES',
    }
}