import config from '../../config';
import AppError from '../../error/AppError';
import { TUser, TUserRole } from '../user/user.interface';
import { User } from '../user/user.model';
import { TLoginUser } from './auth.interface';
import { createToken, verifyToken } from './auth.uitls';

const registerUserIntoDB = async (payload: TUser) => {
  const result = await User.create(payload);
  return result;
};

const loginUser = async (payload: TLoginUser) => {
  //call static method for chek user is exist or not
  const isUserExist = await User.findOne({ email: payload?.email });
  //check if user is exist
  if (!isUserExist) {
    throw new AppError(404, 'User not found!');
  }
  //check if user is blocked
  if (isUserExist?.isBlocked) {
    throw new AppError(403, 'User is blocked!');
  }
  //check if password match
  const passwordMatch = await User.checkLoginPasswordMatch(
    payload?.password,
    isUserExist?.password,
  );
  if (!passwordMatch) {
    throw new AppError(403, 'Password does not matched!');
  }

  //create token and send to the  client
  const jwtPayload = {
    userId: isUserExist?._id,
    name: isUserExist?.name,
    phoneNumber: isUserExist?.phoneNumber,
    email: isUserExist?.email,
    role: isUserExist?.role as TUserRole,
    isBlocked: isUserExist?.isBlocked,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_token_expires_in as string,
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_token_expires_in as string,
  );
  return {
    accessToken,
    refreshToken,
  };
};
const getUserFromDB = async (userId: string) => {
  const isUserExist = await User.findById(userId);
  if (!isUserExist) {
    throw new AppError(404, 'User not exist!');
  }
  if (isUserExist?.isBlocked) {
    throw new AppError(403, 'The user is blocked!');
  }
  return isUserExist;
};
const updateUserFromDB = async (
  updatedUserId: string,
  userData: Partial<TUser>,
  authUserEmail: string,
) => {
  const isUserExist = await User.findById(updatedUserId);
  if (!isUserExist) {
    throw new AppError(404, 'User not exist!');
  }
  if (isUserExist?.isBlocked) {
    throw new AppError(403, 'The user is blocked!');
  }
  if (authUserEmail !== isUserExist?.email) {
    throw new AppError(403, 'Invalid user credential');
  }
  const updatedUser = await User.findByIdAndUpdate(updatedUserId, userData, {
    new: true,
  });
  return updatedUser;
};
const refreshToken = async (token: string) => {
  // checking if the given token is valid
  const decoded = verifyToken(token, config.jwt_refresh_secret as string);

  const { email } = decoded;

  // checking if the user is exist
  const user = await User.checkUserExistByEmailId(email);

  if (!user) {
    throw new AppError(404, 'This user is not found !');
  }
  // checking if the user is already blocked
  const isBlocked = user?.isBlocked;

  if (isBlocked) {
    throw new AppError(403, 'This user is blocked !');
  }

  const jwtPayload = {
    email: user.email,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_token_expires_in as string,
  );

  return {
    token: accessToken,
  };
};

export const AuthServices = {
  registerUserIntoDB,
  loginUser,
  refreshToken,
  getUserFromDB,
  updateUserFromDB,
};
