export default defineEventHandler(async (event) => {
  try {
    const body = await readBody<IUser>(event)

    const requiredFields: (keyof IUser)[] = ['name', 'email', 'phone', 'role', 'country', 'position']
    const missingFields = requiredFields.filter(field => !body[field])

    if (missingFields.length) {
      throw createError({
        statusCode: 400,
        statusMessage: `Missing required fields: ${missingFields.join(', ')}`,
      })
    }

    const newUser = new User({
      ...body,
      status: 'Active',
      lastSession: new Date(),
    })

    await newUser.save()

    return { message: 'User created successfully', user: newUser }
  }
  catch (error: unknown) {
    if (typeof error === 'object' && error !== null && 'code' in error && error.code === 11000) {
      throw createError({ statusCode: 409, statusMessage: 'Email or phone number already exists' })
    }

    console.error('Error creating user:', error)
    throw createError({ statusCode: 500, statusMessage: 'Error creating user' })
  }
})
