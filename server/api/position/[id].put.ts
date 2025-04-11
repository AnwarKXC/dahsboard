export default defineEventHandler(async (event) => {
  const body = await readBody<{ id: string, name?: string, description?: string }>(event)

  if (!body.id) {
    return { status: 400, message: 'Position ID is required' }
  }

  try {
    const updatedPosition = await Position.findByIdAndUpdate(body.id, body, {
      new: true,
      runValidators: true,
    }).lean()

    if (!updatedPosition) {
      return { status: 404, message: 'Position not found' }
    }

    // Update position names

    return { status: 200, message: 'Position updated successfully', updatedPosition }
  }
  catch (error) {
    return { status: 500, message: 'Error updating position', error }
  }
})
