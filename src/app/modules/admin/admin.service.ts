import { JwtPayload } from 'jsonwebtoken';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../error/AppError';
import { User } from '../user/user.model';
import { userSearchableFields } from './admin.constant';

const getAllUsersFromDB = async (
  authenticateUserInfo: JwtPayload,
  query: Record<string, unknown>,
) => {
  const isAdminExist = await User.checkUserExistByEmailId(
    authenticateUserInfo?.email,
  );
  if (!isAdminExist) {
    throw new AppError(404, 'Admin not found!');
  }

  const productQuery = new QueryBuilder(User.find({ role: 'user' }), query)
    .search(userSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();
  const meta = await productQuery.countTotal();
  const result = await productQuery.modelQuery;
  return {
    meta,
    result: result.map(({ _id, name, email, phoneNumber, role, isBlocked }) => {
      return {
        userId: _id,
        name,
        email,
        phoneNumber,
        role,
        isBlocked,
      };
    }),
  };
};
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
  getAllUsersFromDB,
};
