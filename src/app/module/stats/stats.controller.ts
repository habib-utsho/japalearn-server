import { StatusCodes } from 'http-status-codes'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { statsService } from './stats.service'

const getAdminStats = catchAsync(async (req, res) => {
  const data = await statsService.getAdminStats()

  sendResponse(res, StatusCodes.OK, {
    success: true,
    message: 'Admin stats are retrieved successfully!',
    data,
  })
})

export const statsControllers = {
  getAdminStats,
}
