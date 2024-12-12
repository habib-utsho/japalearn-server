import Lesson from '../lesson/lesson.model'
import User from '../user/user.model'
import { Vocabulary } from '../vocabulary/vocabulary.model'

const getAdminStats = async () => {
  const totalUsers = await User.find({ role: 'user' }).countDocuments()
  const totalAdmins = await User.find({ role: 'admin' }).countDocuments()
  const totalLesson = await Lesson.countDocuments()
  const totalVocabulary = await Vocabulary.countDocuments()

  return {
    totalUsers,
    totalAdmins,
    totalLesson,
    totalVocabulary,
  }
}

export const statsService = {
  getAdminStats,
}
