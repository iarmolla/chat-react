import { createSelector } from '@reduxjs/toolkit'

const get = state => state.messages

const getMessages = createSelector([get], (message) => {
  return message
})

export default getMessages