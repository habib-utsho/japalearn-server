import { StatusCodes } from 'http-status-codes'
import { TUser } from './user.interface'
import User from './user.model'
import AppError from '../../errors/appError'
import mongoose from 'mongoose'
import { JwtPayload } from 'jsonwebtoken'
import { uploadImgToCloudinary } from '../../utils/uploadImgToCloudinary'
import QueryBuilder from '../../builder/QueryBuilder'
import { userSearchableFields } from './user.constant'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
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

    let cloudinaryRes
    if (file.path) {
      cloudinaryRes = await uploadImgToCloudinary(
        `${Date.now()}-${payload.name}`,
        file.path,
      )
    }

    const userData: Partial<TUser> = {
      name: payload.name,
      email: payload.email,
      password: payload.password || process.env.STUDENT_DEFAULT_PASSWORD,
      needsPasswordChange: true,
      role: payload.role || 'user',
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
  const total = await User.countDocuments(userQuery?.queryModel.getFilter())
  return { data: result, total }
}

const toggleUserRoleById = async (id: string) => {
  const user = await User.findById(id)
  if (!user) {
    throw new AppError(StatusCodes.FORBIDDEN, 'User is not found!')
  }

  user.role = user.role === 'admin' ? 'user' : 'admin'
  await user.save()

  return user
}

const deleteUserById = async (id: string) => {
  const user = await User.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  ).select('-__v')
  return user
}

const getSingleUserById = async (id: string) => {
  const user = await User.findById(id).select('-__v')
  return user
}

const getMe = async (payload: JwtPayload) => {
  const result = await User.findOne({ email: payload.email }).select('-__v')

  return result
}

export const userServices = {
  insertUserToDb,
  getAllUser,
  deleteUserById,
  toggleUserRoleById,
  getSingleUserById,
  getMe,
}
