import { RequestHandler } from 'express'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { lessonServices } from './lesson.service'
import { StatusCodes } from 'http-status-codes'
import AppError from '../../errors/appError'

const insertLesson: RequestHandler = catchAsync(async (req, res) => {
  const lesson = await lessonServices.insertLessonToDb(req.body)
  sendResponse(res, StatusCodes.OK, {
    success: true,
    message: 'Lesson inserted successfully!',
    data: lesson,
  })
})

const getAllLessons = catchAsync(async (req, res) => {
  const { data, total } = await lessonServices.getAllLessons(req.query)

  const page = req.query?.page ? Number(req.query.page) : 1
  const limit = req.query?.limit ? Number(req.query.limit) : 10
  const totalPage = Math.ceil(total / limit)

  sendResponse(res, StatusCodes.OK, {
    success: true,
    message: 'Lessons retrieved successfully!',
    data,
    meta: { total, page, totalPage, limit },
  })
})

const getLessonById = catchAsync(async (req, res) => {
  const lesson = await lessonServices.getSingleLessonById(
    Number(req.params?.lessonNumber),
  )
  if (!lesson) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Lesson not found!')
  }
  sendResponse(res, StatusCodes.OK, {
    success: true,
    message: 'Lesson retrieved successfully!',
    data: lesson,
  })
})

const updateLessonById: RequestHandler = catchAsync(async (req, res) => {
  const lessonId = req.params?.id
  const updatedLesson = await lessonServices.updateLessonById(
    lessonId,
    req.body,
  )
  if (!updatedLesson) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Lesson not found!')
  }
  sendResponse(res, StatusCodes.OK, {
    success: true,
    message: 'Lesson updated successfully!',
    data: updatedLesson,
  })
})

const deleteLessonById: RequestHandler = catchAsync(async (req, res) => {
  const lessonId = req.params?.id
  const deletedLesson = await lessonServices.deleteLessonById(lessonId)
  if (!deletedLesson) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Lesson not found!')
  }
  sendResponse(res, StatusCodes.OK, {
    success: true,
    message: 'Lesson deleted successfully!',
    data: deletedLesson,
  })
})

export const lessonController = {
  insertLesson,
  getAllLessons,
  getLessonById,
  updateLessonById,
  deleteLessonById,
}
