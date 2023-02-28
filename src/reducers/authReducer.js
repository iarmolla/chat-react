const initialState = []

function auth(state = initialState, action) {
    switch (action.type) {
        case 'LOGIN_USER_SUCCESS':
            const { token } = action.message
            window.localStorage.setItem('token', token)
            return {
                ...action.message
            }
        case 'LOGIN_USER_ERROR':
            const { message } = action.message
            return message
        default: {
            return state
        }
    }
}

export default auth