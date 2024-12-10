import { StatusCodes } from 'http-status-codes'
import { TUser } from './user.interface'
import User from './user.model'
import AppError from '../../errors/appError'
import mongoose from 'mongoose'
import Batch from '../batch/batch.model'
import { JwtPayload } from 'jsonwebtoken'
import { uploadImgToCloudinary } from '../../utils/uploadImgToCloudinary'
import QueryBuilder from '../../builder/QueryBuilder'
import { userSearchableFields } from './user.constant'

const insertUserToDb = async (file: any, payload: TUser) => {
  const session = await mongoose.startSession()

  try {
    session.startTransaction()

    const alreadyExistEmail = await User.findOne({ email: payload.email })
    if (alreadyExistEmail) {
      throw new AppError(
        StatusCodes.BAD_REQUEST,
        'Email is already exist. Try with different email!',
      )
    }
    const cloudinaryRes = await uploadImgToCloudinary(
      `${Date.now()}-${payload.name}`,
      file.path,
    )
    if (cloudinaryRes) {
      payload.profileImg = cloudinaryRes.secure_url
    }

    const userData: Partial<TUser> = {
      email: payload.email,
      password: payload.password || process.env.STUDENT_DEFAULT_PASSWORD,
      needsPasswordChange: true,
      role: 'user',
      profileImg: cloudinaryRes
        ? cloudinaryRes.secure_url
        : 'https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png',
    }
    // Save user
    const user = await User.create([userData], { session })
    if (!user?.length) {
      throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to insert user to db')
    }

    await session.commitTransaction()
    await session.endSession()
    return user[0]
  } catch (err: any) {
    await session.abortTransaction()
    await session.endSession()
    throw new Error(err)
  }
}

const getAllUser = async (query: Record<string, unknown>) => {
  const userQuery = new QueryBuilder(User.find(), {
    ...query,
    sort: `${query.sort} createdAt`,
  })
    .searchQuery(userSearchableFields)
    .filterQuery()
    .sortQuery()
    .paginateQuery()
    .fieldFilteringQuery()
    .populateQuery([])

  const result = await userQuery?.queryModel
  const total = await Batch.countDocuments(userQuery?.queryModel.getFilter())
  return { data: result, total }
}

const getSingleUserById = async (id: string) => {
  const user = await User.findById(id).select('-__v')
  return user
}

const getMe = async (payload: JwtPayload) => {
  const result = await User.findById({ id: payload.email }).select('-__v')

  return result
}

export const userServices = {
  insertUserToDb,
  getAllUser,
  getSingleUserById,
  getMe,
}
