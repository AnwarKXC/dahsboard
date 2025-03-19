interface FilterQuery {
  role?: string
  position?: string
  status?: string
  $or?: Array<{ [key: string]: { $regex: string, $options: string } }>
}

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const page = Number.parseInt(query.page as string, 10) || 1
  const limit = Number.parseInt(query.limit as string, 10) || 10
  const role = query.role as string
  const position = query.position as string
  const status = query.status as string
  const search = query.search as string
  const skip = (page - 1) * limit

  try {
    const filters: FilterQuery = {}

    // Apply role filter
    if (role && role.trim() !== '') {
      filters.role = role
    }

    // Apply position filter
    if (position && position.trim() !== '') {
      filters.position = position
    }

    // Apply status filter
    if (status && status.trim() !== '') {
      filters.status = status
    }

    // Apply search filter (matches name or email)
    if (search && search.trim() !== '') {
      filters.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
      ]
    }

    // Fetch users with filters and pagination
    const users = await User.find(filters).skip(skip).limit(limit).lean()

    // Get total count of users matching filters
    const totalUsers = await User.countDocuments(filters)

    return {
      users,
      totalUsers,
      totalPages: Math.ceil(totalUsers / limit),
      currentPage: page,
    }
  }
  catch (error) {
    console.error('Error fetching users:', error)
    throw createError({ statusCode: 500, statusMessage: 'Error fetching users' })
  }
})
