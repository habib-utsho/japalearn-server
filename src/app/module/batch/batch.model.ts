import { Schema, model } from "mongoose"
import { TBatch } from "./batch.interface"

const batchSchema = new Schema<TBatch>(
  {
    batch: { type: Number, default: 1 },
    department: { type: Schema.Types.ObjectId, ref: 'AcademicDepartment' },
    totalStudent: { type: Number, default: 0 },
  },
  { timestamps: true },
)

const Batch = model('Batch', batchSchema)
export default Batch
