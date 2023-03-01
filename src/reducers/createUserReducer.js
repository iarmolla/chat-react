const initialState = []

function createUserReducer(state = initialState, action) {
    switch (action.type) {
        case 'CREATE_USER_SUCCESS':
            const { auth } = action.message
            return auth
        case 'CREATE_USER_FAILED':
            return action.error.message 
        default: {
            return state
        }
    }
}

export default createUserReducer