import { ObjectId } from 'mongodb'

export default defineEventHandler(async (event) => {
  try {
    const { id } = event.context.params as { id: string }
    const body: IUser = await readBody(event)

    if (!id || !ObjectId.isValid(id)) {
      throw createError({ statusCode: 400, statusMessage: 'Invalid user ID' })
    }

    const updatedUser = await User.findByIdAndUpdate(id, body, { new: true, runValidators: true }).lean()

    if (!updatedUser) {
      throw createError({ statusCode: 404, statusMessage: 'User not found' })
    }

    return { user: updatedUser, message: 'User updated successfully' }
  }
  catch (error) {
    console.error('Error updating user:', error)
    throw createError({ statusCode: 500, statusMessage: 'Error updating user' })
  }
})
