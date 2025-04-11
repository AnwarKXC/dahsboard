import { z } from 'zod'

interface FilterQuery {
  role?: string
  position?: string
  status?: string
  $or?: Array<{ [key: string]: { $regex: string, $options: string } }>
}

export default defineEventHandler(async (event) => {
  const query = getQuery(event)

  // Define schema for query parameters
  const schema = z.object({
    page: z.string().optional().default('1'),
    limit: z.string().optional().default('10'),
    role: z.string().optional(),
    position: z.string().optional(),
    status: z.string().optional(),
    search: z.string().optional(),
  })

  // Validate and parse query parameters
  const parsedQuery = schema.parse(query)

  const page = Number(parsedQuery.page) || 1
  const limit = Number(parsedQuery.limit) || 10
  const skip = (page - 1) * limit

  const filters: FilterQuery = {}

  // Apply filters dynamically
  if (parsedQuery.role)
    filters.role = parsedQuery.role
  if (parsedQuery.position)
    filters.position = parsedQuery.position
  if (parsedQuery.status)
    filters.status = parsedQuery.status

  if (parsedQuery.search) {
    filters.$or = [
      { name: { $regex: parsedQuery.search, $options: 'i' } },
      { email: { $regex: parsedQuery.search, $options: 'i' } },
    ]
  }

  try {
    // Fetch users with filters and pagination
    const [users, totalUsers] = await Promise.all([
      User.find(filters).skip(skip).limit(limit).lean(),
      User.countDocuments(filters),
    ])

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
