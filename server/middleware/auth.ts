import type { H3Event } from 'h3'
import { defineEventHandler, getCookie } from 'h3'

export default defineEventHandler(async (event: H3Event) => {
  const userId = getCookie(event, 'auth_token')
  if (userId) {
    const user = await User.findById(userId).select('-password')
    if (user) {
      event.context.currentUser = user
    }
  }
})
