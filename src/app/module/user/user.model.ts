/* eslint-disable @typescript-eslint/no-explicit-any */
import { Schema, model } from 'mongoose'
import { TUser } from './user.interface'
import bcrypt from 'bcrypt'

const UserSchema = new Schema<TUser>(
  {
    name: { type: String, required: [true, 'Name is required'] },
    email: { type: String, unique: true }, //FK
    password: { type: String, required: [true, 'Password is required'] },
    needsPasswordChange: { type: Boolean, default: false },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
      required: true,
    },
    profileImg: { type: String },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true },
)

UserSchema.pre<TUser>(
  'save',
  async function (this: TUser, next: (err?: any) => void) {
    try {
      const hashPass = await bcrypt.hash(
        this.password,
        Number(process.env.SALT_ROUNDS),
      )

      this.password = hashPass
      next()
    } catch (e: any) {
      next(e)
    }
  },
)

const User = model<TUser>('User', UserSchema)
export default User
