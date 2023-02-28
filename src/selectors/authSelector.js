import { createSelector } from '@reduxjs/toolkit'

const get = state => state.auth

const getMessage = createSelector([get], (message) => {
  return message
})

export default getMessage