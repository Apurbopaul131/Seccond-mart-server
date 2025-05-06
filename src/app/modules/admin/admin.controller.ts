import { Request, Response } from 'express';
import catchAsync from '../../uitls/catchAsync';
import sendResponse from '../../uitls/sendResponse';
import { AdminServices } from './admin.service';

const getAllUsers = catchAsync(async (req, res) => {
  const { meta, result } = await AdminServices.getAllUsersFromDB(
    req.user,
    req.query,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Users retrived successfully',
    meta: meta,
    data: result,
  });
});
const blockedUserByAdmin = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.params;
  await AdminServices.blockedUserByAdminIntoDB(req.user, userId);
  //send response to client
  sendResponse(res, {
    success: true,
    message: 'User blocked successfully',
    statusCode: 200,
  });
});
export const AdminControllers = {
  blockedUserByAdmin,
  getAllUsers,
};
