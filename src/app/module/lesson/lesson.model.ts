import { Schema, model } from 'mongoose'
import { TLesson } from './lesson.interface'

const lessonSchema = new Schema<TLesson>(
  {
    name: { type: String, required: true },
    number: { type: Number, required: true, default: 0 },
    vocabularyCount: { type: Number, default: 0 },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true },
)

const Lesson = model('Lesson', lessonSchema)
export default Lesson
