import { Types } from "mongoose"

type TBatch  = {
    batch: number
    department: Types.ObjectId
    totalStudent: number
}

export { TBatch }