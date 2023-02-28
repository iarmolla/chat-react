const initialState = []

function users(state = initialState, action) {

    switch (action.type) {
        case 'GET_USERS_SUCCESS':
            return [
                ...state, ...action.users
            ]
        case 'CREATE_USER_SUCCESS':
            return {
                ...state, ...action.message
            }
        case 'GET_USER_SUCCESS':
            return [
                ...action.users
            ]
        default: {
            return state
        }
    }
}

export default users