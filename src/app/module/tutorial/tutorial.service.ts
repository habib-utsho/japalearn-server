import Tutorial from './tutorial.model'
import QueryBuilder from '../../builder/QueryBuilder'
import { TTutorial } from './tutorial.interface'
import { tutorialSearchableFields } from './tutorial.constant'
import AppError from '../../errors/appError'
import { StatusCodes } from 'http-status-codes'

const insertTutorialToDb = async (payload: TTutorial) => {
  const tutorial = await Tutorial.create(payload)
  return tutorial
}

const getAllTutorials = async (query: Record<string, unknown>) => {
  const tutorialQuery = new QueryBuilder(Tutorial.find(), {
    ...query,
    sort: `${query.sort}`,
  })
    .searchQuery(tutorialSearchableFields)
    .filterQuery()
    .sortQuery()
    .paginateQuery()
    .fieldFilteringQuery()
    .populateQuery(['lesson'])

  const result = await tutorialQuery?.queryModel
  const total = await Tutorial.countDocuments(
    tutorialQuery?.queryModel.getFilter(),
  )
  return { data: result, total }
}

const getSingleTutorialById = async (id: string) => {
  const tutorial = await Tutorial.findById(id).populate('lesson').select('-__v')
  if (!tutorial) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Tutorial not found')
  }
  return tutorial
}

const updateTutorialById = async (id: string, payload: Partial<TTutorial>) => {
  const tutorial = await Tutorial.findByIdAndUpdate(id, payload, { new: true })
  if (!tutorial) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Tutorial not found')
  }
  return tutorial
}

const deleteTutorialById = async (id: string) => {
  const tutorial = await Tutorial.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  )
  if (!tutorial) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Tutorial not found')
  }
  return tutorial
}

export const tutorialServices = {
  insertTutorialToDb,
  getAllTutorials,
  getSingleTutorialById,
  updateTutorialById,
  deleteTutorialById,
}
