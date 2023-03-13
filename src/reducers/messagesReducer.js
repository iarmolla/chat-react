const initialState = []

function messages(state = initialState, action) {
    switch (action.type) {
        case 'GET_MESSAGES_SUCCESS':
            return [
                ...action.messages
            ]
        case 'SAVE_MESSAGES':
            return [
                ...state, ...action.messages
            ]
        default: {
            return state
        }
    }
}

export default messages