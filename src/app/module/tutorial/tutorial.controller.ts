import { RequestHandler } from 'express'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { tutorialServices } from './tutorial.service'
import { StatusCodes } from 'http-status-codes'
import AppError from '../../errors/appError'

const insertTutorial: RequestHandler = catchAsync(async (req, res) => {
  const tutorial = await tutorialServices.insertTutorialToDb(req.body)
  sendResponse(res, StatusCodes.OK, {
    success: true,
    message: 'Tutorial inserted successfully!',
    data: tutorial,
  })
})

const getAllTutorials = catchAsync(async (req, res) => {
  const { data, total } = await tutorialServices.getAllTutorials(req.query)

  const page = req.query?.page ? Number(req.query.page) : 1
  const limit = req.query?.limit ? Number(req.query.limit) : 10
  const totalPage = Math.ceil(total / limit)

  sendResponse(res, StatusCodes.OK, {
    success: true,
    message: 'Tutorials retrieved successfully!',
    data,
    meta: { total, page, totalPage, limit },
  })
})

const getTutorialById = catchAsync(async (req, res) => {
  const tutorial = await tutorialServices.getSingleTutorialById(req.params?.id)
  if (!tutorial) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Tutorial not found!')
  }
  sendResponse(res, StatusCodes.OK, {
    success: true,
    message: 'Tutorial retrieved successfully!',
    data: tutorial,
  })
})

const updateTutorialById: RequestHandler = catchAsync(async (req, res) => {
  const tutorialId = req.params?.id
  const updatedTutorial = await tutorialServices.updateTutorialById(
    tutorialId,
    req.body,
  )
  if (!updatedTutorial) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Tutorial not found!')
  }
  sendResponse(res, StatusCodes.OK, {
    success: true,
    message: 'Tutorial updated successfully!',
    data: updatedTutorial,
  })
})

const deleteTutorialById: RequestHandler = catchAsync(async (req, res) => {
  const tutorialId = req.params?.id
  const deletedTutorial = await tutorialServices.deleteTutorialById(tutorialId)
  if (!deletedTutorial) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Tutorial not found!')
  }
  sendResponse(res, StatusCodes.OK, {
    success: true,
    message: 'Tutorial deleted successfully!',
    data: deletedTutorial,
  })
})

export const tutorialController = {
  insertTutorial,
  getAllTutorials,
  getTutorialById,
  updateTutorialById,
  deleteTutorialById,
}
