import { RequestHandler } from 'express'

import sendResponse from '../../utils/sendResponse'
import { StatusCodes } from 'http-status-codes'
import catchAsync from '../../utils/catchAsync'
import AppError from '../../errors/appError'
import { userServices } from './user.service'
import { JwtPayload } from 'jsonwebtoken'

const insertUser: RequestHandler = catchAsync(async (req, res) => {
  const user = await userServices.insertUserToDb(req.file, req.body)

  sendResponse(res, StatusCodes.OK, {
    success: true,
    message: 'User inserted successfully!',
    data: user,
  })
})

const getAllUsers: RequestHandler = catchAsync(async (req, res) => {
  const { data, total } = await userServices.getAllUser(req.query)

  const page = req.query?.page ? Number(req.query.page) : 1
  const limit = req.query?.limit ? Number(req.query.limit) : 10
  const totalPage = Math.ceil(total / limit)

  sendResponse(res, StatusCodes.OK, {
    success: true,
    message: 'Users are retrieved successfully!',
    data,
    meta: { total, page, totalPage, limit },
  })
})

const getUserById: RequestHandler = catchAsync(async (req, res) => {
  const user = await userServices.getSingleUserById(req.params?.id)
  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User not found!')
  }
  sendResponse(res, StatusCodes.OK, {
    success: true,
    message: 'User is retrieved successfully!',
    data: user,
  })
})

const deleteUserById = catchAsync(async (req, res) => {
  const user = await userServices.deleteUserById(req.params.id)
  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User not found!')
  }
  sendResponse(res, StatusCodes.OK, {
    success: true,
    message: 'User is deleted successfully!',
    data: user,
  })
})
const toggleUserRoleById = catchAsync(async (req, res) => {
  const user = await userServices.toggleUserRoleById(req.params.id)
  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User not found!')
  }
  sendResponse(res, StatusCodes.OK, {
    success: true,
    message: `This user is now ${user.role}!`,
    data: user,
  })
})

const getMe: RequestHandler = catchAsync(async (req, res) => {
  const user = await userServices.getMe(req.user as JwtPayload)
  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User not found!')
  }
  sendResponse(res, StatusCodes.OK, {
    success: true,
    message: 'User is retrieved successfully!',
    data: user,
  })
})

export const userController = {
  insertUser,
  getAllUsers,
  deleteUserById,
  toggleUserRoleById,
  getUserById,
  getMe,
}
