import { type Document, model, type Model, Schema } from 'mongoose'

// Define Position interface
export interface IPosition extends Document {
  name: {
    ar: string
    en: string
  }
  description?: string
}

// Define Position model interface
interface IPositionModel extends Model<IPosition> {
  getPositionNames: () => Promise<string[]>
}

// Define Schema
const PositionSchema = new Schema<IPosition>(
  {
    name: {
      ar: { type: String, required: true },
      en: { type: String, required: true },
    },
    description: { type: String, required: false },
  },
  { timestamps: true },
)

// Static method to get position names dynamically
PositionSchema.statics.getPositionNames = async function (): Promise<string[]> {
  const positions = await this.find().select('name -_id').lean()
  return positions.map((pos: Pick<IPosition, 'name'>) => pos.name)
}

// Export the model
export const Position = model<IPosition, IPositionModel>('Position', PositionSchema)
