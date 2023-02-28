import { combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import usersReducer from '../reducers/usersReducer'
import authReducer from '../reducers/authReducer'
import createUserReducer from '../reducers/createUserReducer'
import { configureStore } from '@reduxjs/toolkit'

const reducer = combineReducers({
    users: usersReducer,
    auth: authReducer,
    createUser: createUserReducer
})

export const store = configureStore(
    {
        reducer,
        middleware: [thunk]
    }

)