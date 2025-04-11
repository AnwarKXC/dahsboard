export default defineEventHandler(async (event) => {
  try {
    const { id } = event.context.params as { id: string }

    if (!id || !isValidId(id)) {
      return createError({ statusCode: 400, statusMessage: 'Invalid position ID' })
    }

    const deletedPosition = await Position.findByIdAndDelete(id)

    if (!deletedPosition) {
      return createError({ statusCode: 404, statusMessage: 'Position not found' })
    }

    return {
      message: 'Position deleted successfully',
    }
  }
  catch (error) {
    console.error('Error deleting Position:', error)
    throw createError({ statusCode: 500, statusMessage: 'Error deleting Position' })
  }
})
