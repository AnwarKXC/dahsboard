export default defineEventHandler(async (event) => {
  try {
    const { id } = event.context.params as { id: string }

    if (!id || !isValidId(id)) {
      return createError({ statusCode: 400, statusMessage: 'Invalid user ID' })
    }

    const deletedUser = await User.findByIdAndDelete(id)

    if (!deletedUser) {
      return createError({ statusCode: 404, statusMessage: 'User not found' })
    }

    return {
      message: 'User deleted successfully',
    }
  }
  catch (error) {
    console.error('Error deleting user:', error)
    return createError({ statusCode: 500, statusMessage: 'Error deleting user' })
  }
})
