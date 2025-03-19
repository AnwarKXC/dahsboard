import { type Document, model, type Model, Schema } from 'mongoose'

type UserDocument = Document & IUser

interface IUserModel extends Model<UserDocument> {
  updateActiveStatus: () => Promise<void>
}

const UserSchema = new Schema<UserDocument>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    role: { type: String, enum: Role, required: true },
    profileImage: { type: String, required: true },
    images: { type: [String], default: [] },
    country: { type: String, required: true },
    status: { type: String, enum: Status, required: true },
    position: { type: String, required: true },
    lastSession: { type: Date, default: Date.now },
  },
  { timestamps: true },
)

// Indexes for filtering
UserSchema.index({ role: 1 })
UserSchema.index({ position: 1 })
UserSchema.index({ status: 1 })
UserSchema.index({ name: 1 })
// Create unique indexes for email and phone
UserSchema.index({ email: 1 }, { unique: true })
UserSchema.index({ phone: 1 }, { unique: true })

// Static method to update status based on last session
UserSchema.statics.updateActiveStatus = async function () {
  const threeMonthsAgo = new Date()
  threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3)

  await this.updateMany(
    { lastSession: { $lt: threeMonthsAgo } },
    { $set: { status: Status.InActive } },
  )
  await this.updateMany(
    { lastSession: { $gte: threeMonthsAgo } },
    { $set: { status: Status.Active } },
  )
}

export const User = model<UserDocument, IUserModel>('User', UserSchema)
