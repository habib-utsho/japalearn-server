import { RequestHandler } from 'express'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { vocabularyServices } from './vocabulary.service'
import { StatusCodes } from 'http-status-codes'
import AppError from '../../errors/appError'

const insertVocabulary: RequestHandler = catchAsync(async (req, res) => {
  const vocabulary = await vocabularyServices.insertVocabularyToDb(req.body)
  sendResponse(res, StatusCodes.OK, {
    success: true,
    message: 'Vocabulary inserted successfully!',
    data: vocabulary,
  })
})

const getAllVocabulary = catchAsync(async (req, res) => {
  const { data, total } = await vocabularyServices.getAllVocabulary(req.query)

  const page = req.query?.page ? Number(req.query.page) : 1
  const limit = req.query?.limit ? Number(req.query.limit) : 10
  const totalPage = Math.ceil(total / limit)

  sendResponse(res, StatusCodes.OK, {
    success: true,
    message: 'Vocabulary retrieved successfully!',
    data,
    meta: { total, page, totalPage, limit },
  })
})

const getVocabularyById = catchAsync(async (req, res) => {
  const vocabulary = await vocabularyServices.getSingleVocabularyById(req.params?.id)
  if (!vocabulary) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Vocabulary not found!')
  }
  sendResponse(res, StatusCodes.OK, {
    success: true,
    message: 'Vocabulary retrieved successfully!',
    data: vocabulary,
  })
})

const updateVocabularyById: RequestHandler = catchAsync(async (req, res) => {
  const vocabularyId = req.params?.id
  const updatedVocabulary = await vocabularyServices.updateVocabularyById(
    vocabularyId,
    req.body,
  )
  if (!updatedVocabulary) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Vocabulary not found!')
  }
  sendResponse(res, StatusCodes.OK, {
    success: true,
    message: 'Vocabulary updated successfully!',
    data: updatedVocabulary,
  })
})

const deleteVocabularyById: RequestHandler = catchAsync(async (req, res) => {
  const vocabularyId = req.params?.id
  const deletedVocabulary = await vocabularyServices.deleteVocabularyById(vocabularyId)
  if (!deletedVocabulary) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Vocabulary not found!')
  }
  sendResponse(res, StatusCodes.OK, {
    success: true,
    message: 'Vocabulary deleted successfully!',
    data: deletedVocabulary,
  })
})

export const vocabularyController = {
  insertVocabulary,
  getAllVocabulary,
  getVocabularyById,
  updateVocabularyById,
  deleteVocabularyById,
}
