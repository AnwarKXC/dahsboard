import { z } from 'zod'

export default defineEventHandler(async (event) => {
  try {
    // Define schema for validation
    const userSchema = z.object({
      name: z.string().min(1, 'Name is required'),
      email: z.string().email('Invalid email format'),
      phone: z.string().min(1, 'Phone is required'),
      role: z.string().min(1, 'Role is required'),
      country: z.string().min(1, 'Country is required'),
      position: z.string().min(1, 'Position is required'),
    })

    // Validate request body
    const body = await readBody(event)
    const parsedBody = userSchema.parse(body)

    // Create new user
    const newUser = new User({
      ...parsedBody,
      status: 'Active',
      lastSession: new Date(),
    })

    await newUser.save()

    return { message: 'User created successfully', user: newUser }
  }
  catch (error: unknown) {
    if (error instanceof z.ZodError) {
      // Extract meaningful validation error messages
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

    if (
      typeof error === 'object'
      && error !== null
      && 'code' in error
      && (error as { code: number }).code === 11000
    ) {
      throw createError({ statusCode: 409, statusMessage: 'Email or phone number already exists' })
    }

    console.error('Error creating user:', error)
    throw createError({ statusCode: 500, statusMessage: 'Error creating user' })
  }
})
