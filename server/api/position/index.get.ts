export default defineEventHandler(async () => {
  try {
    const positions = await Position.find().select('name').lean()
    return { positions }
  }
  catch (error) {
    console.error('Error fetching Positions:', error)
    return createError({ statusCode: 500, statusMessage: 'Error fetching Positions' })
  }
})
