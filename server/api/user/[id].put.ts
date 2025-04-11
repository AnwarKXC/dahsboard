import type { UpdateQuery } from 'mongoose'
import type { UserDocument } from '~~/server/models/User.model'
import { ObjectId } from 'mongodb'

export default defineEventHandler(async (event) => {
  try {
    const { id } = event.context.params as { id: string }
    const body = await readBody<UpdateQuery<UserDocument> | undefined>(event)

    if (!id || !ObjectId.isValid(id)) {
      return createError({ statusCode: 400, statusMessage: 'Invalid user ID' })
    }

    const updatedUser = await User.findByIdAndUpdate(id, body, { new: true, runValidators: true }).lean()

    if (!updatedUser) {
      return createError({ statusCode: 404, statusMessage: 'User not found' })
    }

    return { user: updatedUser, message: 'User updated successfully' }
  }
  catch (error) {
    console.error('Error updating user:', error)
    return createError({ statusCode: 500, statusMessage: 'Error updating user' })
  }
})
