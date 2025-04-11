export enum Role {
  Admin = 'Admin',
  Employee = 'Employee',
  User = 'User',
}

export enum Currency {
  AED = 'AED',
  EGP = 'EGP',
  EUR = 'EUR',
  GBP = 'GBP',
  KWD = 'KWD',
  SAR = 'SAR',
  USD = 'USD',
}

export enum Status {
  Active = 'Active',
  InActive = 'InActive',
}

export interface UsersResponse {
  users: IUser[]
  totalUsers: number
  totalPages: number
  currentPage: number
}
