import { createSelector } from '@reduxjs/toolkit'

const get = state => state?.users

const getUsers = createSelector([get], (users) => {
  return users
})

export default getUsers