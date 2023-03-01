const initialState = []

function auth(state = initialState, action) {
    switch (action.type) {
        case 'LOGIN_USER_SUCCESS':
            const { token, auth } = action.message
            window.localStorage.setItem('token', token)
            return auth
        case 'LOGIN_USER_ERROR':
            let { message } = action.message
            message = 'Username or password is not correct'
            return message
        default: {
            return state
        }
    }
}

export default auth