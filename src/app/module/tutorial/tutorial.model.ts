import { Schema, model } from 'mongoose'
import { TTutorial } from './tutorial.interface'

const tutorialSchema = new Schema<TTutorial>(
  {
    title: { type: String, required: true },
    link: {
      type: String,
      required: true,
      match: /^(http|https):\/\/[^ "\n]+$/,
    },
    description: { type: String, default: '' },
    lesson: { type: Schema.Types.ObjectId, ref: 'Lesson', required: true },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true },
)

const Tutorial = model('Tutorial', tutorialSchema)
export default Tutorial
