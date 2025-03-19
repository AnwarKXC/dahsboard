import { ObjectId } from 'mongodb'

export default function isValidId(id: string): boolean {
  return ObjectId.isValid(id)
}
