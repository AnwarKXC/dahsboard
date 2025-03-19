export default defineEventHandler(async (event) => {
  try {
    const { id } = event.context.params as { id: string }

    if (!id || !isValidId(id)) {
      throw createError({ statusCode: 400, statusMessage: 'Invalid user ID' })
    }

    const deletedUser = await User.findByIdAndDelete(id)

    if (!deletedUser) {
      throw createError({ statusCode: 404, statusMessage: 'User not found' })
    }

    return {
      message: 'User deleted successfully',
    }
  }
  catch (error) {
    console.error('Error deleting user:', error)
    throw createError({ statusCode: 500, statusMessage: 'Error deleting user' })
  }
})
