import { StatusCodes } from 'http-status-codes'
import AppError from '../../errors/appError'
import Batch from './batch.model'
import QueryBuilder from '../../builder/QueryBuilder'
import { batchSearchableFields } from './batch.constant'

const insertBatchToDb = async (departmentId: string) => {
  // const isDeptExistInBatch = await Batch.findOne({department: departmentId})
  const totalBatch = await Batch.find({
    department: departmentId,
  }).countDocuments()


  const batch = await Batch.create({
    department: departmentId,
    batch: totalBatch ? totalBatch + 1 : 1,
    totalStudent: 0,
  })
  return batch
}

const getAllBatch = async (query: Record<string, unknown>) => {
  const batchQuery = new QueryBuilder(Batch.find(), {
    ...query,
    sort: `${query.sort} totalStudent`,
  })
    .searchQuery(batchSearchableFields)
    .filterQuery()
    .sortQuery()
    .paginateQuery()
    .fieldFilteringQuery()
    .populateQuery([
      {
        path: 'department',
      },
    ])

  const result = await batchQuery?.queryModel
  const total = await Batch.countDocuments(batchQuery?.queryModel.getFilter())
  return { data: result, total }
}

const getSingleBatchById = async (id: string) => {
  const batch = await Batch.findById(id)
    .populate({
      path: 'department',
      select: '-createdAt -updatedAt -__v',
      populate: {
        path: 'academicFaculty',
        select: '-createdAt -updatedAt -__v',
      },
    })
    .select('-__v')
  return batch
}

export const batchServices = {
  insertBatchToDb,
  getAllBatch,
  getSingleBatchById,
}
