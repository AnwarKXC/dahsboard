import { z } from 'zod'

export default defineEventHandler(async (event) => {
  try {
    // Define schema for validation
    const positionSchema = z.object({
      name: z.object({
        ar: z.string().min(1, 'Arabic name is required'),
        en: z.string().min(1, 'English name is required'),
      }),
      description: z.string().optional(),
    })

    // Validate request body
    const body = await readBody(event)
    const parsedBody = positionSchema.parse(body)

    // Check if position already exists
    const existingPosition = await Position.findOne({ 'name.en': parsedBody.name.en })
    if (existingPosition) {
      throw createError({ statusCode: 400, statusMessage: 'Position already exists' })
    }

    // Create and save position
    const position = new Position(parsedBody)
    await position.save()

    return { message: 'Position added successfully', position }
  }
  catch (error: unknown) {
    if (error instanceof z.ZodError) {
      // Extract only meaningful error messages
      const formattedErrors = error.errors.map(err => ({
        path: err.path.join('.'),
        message: err.message,
      }))

      throw createError({
        statusCode: 400,
        statusMessage: 'Validation error',
        data: formattedErrors,
      })
    }

    console.error('Error adding position:', error)
    throw createError({ statusCode: 500, statusMessage: 'Error adding position' })
  }
})
