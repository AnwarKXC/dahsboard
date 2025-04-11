import { Position } from '~~/server/models/Position.model'

export default defineEventHandler(async () => {
  try {
    const positions = await Position.getPositionNames() // Using model method
    return positions
  }
  catch (error) {
    return { status: 500, message: 'Error retrieving positions', error }
  }
})
