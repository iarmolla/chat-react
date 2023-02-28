import { createSelector } from '@reduxjs/toolkit'

const get = state => state.createUser

const getMessage = createSelector([get], (message) => {
  return message
})

export default getMessage