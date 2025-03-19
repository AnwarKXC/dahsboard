export enum Role {
  Admin = 'Admin',
  Employee = 'Employee',
  User = 'User',
}

export enum Status {
  Active = 'Active',
  InActive = 'InActive',
}

export interface IUser {
  name: string
  email: string
  phone: string
  role: Role
  profileImage: string
  images: string[]
  country: string
  position: string
  _id?: string
  status?: Status
  lastSession?: Date
  createdAt?: Date
  updatedAt?: Date
  __v?: 0
}

export interface UsersResponse {
  users: IUser[]
  totalUsers: number
  totalPages: number
  currentPage: number
}
