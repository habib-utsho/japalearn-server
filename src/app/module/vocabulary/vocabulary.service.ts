import { TVocabulary } from './vocabulary.interface'
import QueryBuilder from '../../builder/QueryBuilder'
import { vocabularySearchableFields } from './vocabulary.constant'
import AppError from '../../errors/appError'
import { StatusCodes } from 'http-status-codes'
import { Vocabulary } from './vocabulary.model'
import Lesson from '../lesson/lesson.model'

const insertVocabularyToDb = async (payload: TVocabulary) => {
  const existingVocabulary = await Vocabulary.findOne({ name: payload.word })
  if (existingVocabulary) {
    throw new AppError(StatusCodes.CONFLICT, 'Vocabulary already exists')
  }
  const lesson = await Lesson.findOne({
    number: payload.lessonNumber,
  })
  if (!lesson) {
    throw new AppError(
      StatusCodes.CONFLICT,
      'Lesson not found with this lesson number',
    )
  }

  lesson.vocabularyCount += 1
  await lesson.save()
  const vocabulary = await Vocabulary.create(payload)
  return vocabulary
}

const getAllVocabulary = async (query: Record<string, unknown>) => {
  const vocabularyQuery = new QueryBuilder(Vocabulary.find(), {
    ...query,
    sort: `${query.sort}`,
  })
    .searchQuery(vocabularySearchableFields)
    .filterQuery()
    .sortQuery()
    .paginateQuery()
    .fieldFilteringQuery()

  const result = await vocabularyQuery?.queryModel
  const total = await Vocabulary.countDocuments(
    vocabularyQuery?.queryModel.getFilter(),
  )
  return { data: result, total }
}

const getSingleVocabularyById = async (id: string) => {
  const vocabulary = await Vocabulary.findById(id).select('-__v')
  return vocabulary
}

const updateVocabularyById = async (
  id: string,
  payload: Partial<TVocabulary>,
) => {
  if (payload.lessonNumber) {
    const lesson = await Lesson.findOne({
      number: payload.lessonNumber,
    })
    if (!lesson) {
      throw new AppError(
        StatusCodes.CONFLICT,
        'Lesson not found with this lesson number',
      )
    }
    const vocabulary = await Vocabulary.findById(id)
    if (vocabulary) {
      if (vocabulary.lessonNumber !== payload.lessonNumber) {
        const oldLesson = await Lesson.findOne({
          number: vocabulary.lessonNumber,
        })
        if (oldLesson) {
          oldLesson.vocabularyCount -= 1
          await oldLesson.save()
        }
        lesson.vocabularyCount += 1
        await lesson.save()
      }
    } else {
      throw new AppError(
        StatusCodes.NOT_FOUND,
        'Vocabulary not found with this id',
      )
    }
  }

  const vocabulary = await Vocabulary.findByIdAndUpdate(id, payload, {
    new: true,
  })

  if (!vocabulary) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Vocabulary not found!')
  }

  return vocabulary
}

const deleteVocabularyById = async (id: string) => {
  const vocabulary = await Vocabulary.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  )
  return vocabulary
}

export const vocabularyServices = {
  insertVocabularyToDb,
  getAllVocabulary,
  getSingleVocabularyById,
  updateVocabularyById,
  deleteVocabularyById,
}
