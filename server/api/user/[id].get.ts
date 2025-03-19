export default defineEventHandler(async (event) => {
  try {
    const { id } = event.context.params as { id: string }

    if (!id || !isValidId(id)) {
      throw createError({ statusCode: 400, statusMessage: 'Invalid user ID' })
    }

    const user = await User.findById(id).lean()

    if (!user) {
      throw createError({ statusCode: 404, statusMessage: 'User not found' })
    }

    return { user }
  }
  catch (error) {
    console.error('Error fetching user:', error)
    throw createError({ statusCode: 500, statusMessage: 'Error fetching user' })
  }
})
