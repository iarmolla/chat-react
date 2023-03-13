import api from '../services/users'

export function getMessagesFetch(room) {
    return async (dispatch) => {
        try {
            const response = await api.messages(room)
            dispatch(getMessagesSuccess(response.data))
        } catch (error) {
            dispatch(getMessagesFailed(error))
        }
    }
}

export function getMessagesSuccess(messages) {
    return {
        type: 'GET_MESSAGES_SUCCESS',
        messages
    }
}

export function saveMessages(messages) {
    return {
        type: 'SAVE_MESSAGES',
        messages
    }
}

export function getMessagesFailed(error) {
    return {
        type: 'GET_MESSAGES_FAILED',
        error
    }
}