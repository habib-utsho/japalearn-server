import Lesson from './lesson.model'
import QueryBuilder from '../../builder/QueryBuilder'
import { TLesson } from './lesson.interface'
import { lessonSearchableFields } from './lesson.constant'
import AppError from '../../errors/appError'
import { StatusCodes } from 'http-status-codes'

const insertLessonToDb = async (payload: TLesson) => {
  const existingLesson = await Lesson.findOne({ name: payload.name })

  if (existingLesson) {
    throw new AppError(StatusCodes.CONFLICT, 'Lesson name already exists')
  }

  const existingLessonNumber = await Lesson.findOne({ number: payload.number })
  if (existingLessonNumber) {
    throw new AppError(StatusCodes.CONFLICT, 'Lesson number already exists')
  }
  const lesson = await Lesson.create(payload)
  return lesson
}

const getAllLessons = async (query: Record<string, unknown>) => {
  const lessonQuery = new QueryBuilder(Lesson.find(), {
    ...query,
    sort: `${query.sort}`,
  })
    .searchQuery(lessonSearchableFields)
    .filterQuery()
    .sortQuery()
    .paginateQuery()
    .fieldFilteringQuery()
    .populateQuery([])

  const result = await lessonQuery?.queryModel

  const total = await Lesson.countDocuments(lessonQuery?.queryModel.getFilter())
  return { data: result, total }
}

const getSingleLessonById = async (lessonNumber: number) => {
  const lesson = await Lesson.findOne({ number: lessonNumber }).select('-__v')
  return lesson
}
const updateLessonById = async (id: string, payload: Partial<TLesson>) => {
  if (payload.name) {
    const existingLesson = await Lesson.findOne({ name: payload.name })
    if (existingLesson && existingLesson._id.toString() !== id) {
      throw new AppError(StatusCodes.CONFLICT, 'Lesson name already exists')
    }
  }
  if (payload.number) {
    const existingLesson = await Lesson.findOne({ number: payload.number })
    if (existingLesson && existingLesson._id.toString() !== id) {
      throw new AppError(StatusCodes.CONFLICT, 'Lesson number already exists')
    }
  }

  const lesson = await Lesson.findByIdAndUpdate(id, payload, { new: true })
  return lesson
}
const deleteLessonById = async (id: string) => {
  const lesson = await Lesson.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  )
  return lesson
}

export const lessonServices = {
  insertLessonToDb,
  getAllLessons,
  getSingleLessonById,
  updateLessonById,
  deleteLessonById,
}
