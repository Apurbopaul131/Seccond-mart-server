import { JwtPayload } from 'jsonwebtoken';
import AppError from '../../error/AppError';
import { User } from '../user/user.model';

const blockedUserByAdminIntoDB = async (
  authenticateUserInfo: JwtPayload,
  userId: string,
) => {
  const isAdminExist = await User.checkUserExistByEmailId(
    authenticateUserInfo?.email,
  );
  //check if authenticate admin exist
  if (!isAdminExist) {
    throw new AppError(404, 'Admin not found!');
  }
  //check if admin is blocked
  if (isAdminExist?.isBlocked) {
    throw new AppError(403, 'Admin is blocked!');
  }
  const isUserExist = await User.findById(userId);
  //check if user is exist
  if (!isUserExist) {
    throw new AppError(404, 'User not found!');
  }
  //check if user is already blocked
  if (isUserExist.isBlocked) {
    throw new AppError(403, 'User is already blocked!');
  }
  if (isUserExist && isUserExist.role !== 'user') {
    throw new AppError(403, 'You may provided admin id!');
  }
  const result = await User.findByIdAndUpdate(
    userId,
    { isBlocked: true },
    {
      new: true,
    },
  );
  return result;
};
//export
export const AdminServices = {
  blockedUserByAdminIntoDB,
};
