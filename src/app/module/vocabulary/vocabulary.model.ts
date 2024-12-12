import { Schema, model } from 'mongoose'
import { TVocabulary } from './vocabulary.interface'

const vocabularySchema = new Schema<TVocabulary>({
  word: { type: String, required: true },
  meaning: { type: String, required: true },
  pronunciation: { type: String, required: true },
  whenToSay: { type: String, required: true },
  lessonNumber: { type: Number, required: true, default: 0 },
  adminEmail: { type: String, required: true },
  isDeleted: { type: Boolean, default: false },
})

const Vocabulary = model<TVocabulary>('Vocabulary', vocabularySchema)

export { Vocabulary }
