const initialState = []

function createUserReducer(state = initialState, action) {
    switch (action.type) {
        case 'CREATE_USER_SUCCESS':
            return action.message 
        case 'CREATE_USER_FAILED':
            return action.error.message 
        default: {
            return state
        }
    }
}

export default createUserReducer