import { Types } from 'mongoose'

export type TTutorial = {
  title: string
  link: string
  description?: string
  lesson: Types.ObjectId
  isDeleted: boolean
}
