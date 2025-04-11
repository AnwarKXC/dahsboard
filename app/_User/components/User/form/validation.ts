import { z } from 'zod'

export const validationSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email').min(1, 'Email is required'),
  phone: z.string().min(10, 'Phone is required'),
  position: z.nativeEnum(Position, { message: 'Position is required' }),
  role: z.nativeEnum(Role, { message: 'Role is required' }),
  country: z.string().min(1, 'Country is required'),
  images: z.array(z.string()),
  profileImage: z.string().min(1, 'Image is required'),
})
