import { defineEventHandler } from 'h3'

export default defineEventHandler(async (event) => {
  if (!event.context.currentUser) {
    throw createError({ statusCode: 401, message: 'Unauthorized' })
  }
  return { user: event.context.currentUser }
})
