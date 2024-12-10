type TUser = {
  name: string
  email: string
  password: string
  needsPasswordChange: boolean
  profileImg: string
  role: TUserRole
  status: 'active' | 'inactive'
  isDeleted: boolean
}

type TUserRole = 'admin' | 'user'

export { TUser, TUserRole }
