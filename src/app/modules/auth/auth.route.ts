import express from 'express';
import auth from '../../middlewires/auth';
import validateRequest from '../../middlewires/validateRequest';
import { USER_ROLE } from '../user/user.constant';
import { UserValidations } from '../user/user.validation';
import { AuthControllers } from './auth.controller';
import { AuthValidations } from './auth.validation';

const router = express.Router();
//Register a new user.
router.post(
  '/auth/register',
  validateRequest(UserValidations.createUserValidationSchema),
  AuthControllers.registerUser,
);
//user login
router.post(
  '/auth/login',
  validateRequest(AuthValidations.loginUserValidationSchema),
  AuthControllers.loginUser,
);
router.post(
  '/auth/refresh-token',
  // validateRequest(AuthValidations.refreshTokenValidationSchema),
  AuthControllers.refreshToken,
);
//Retrieve user details
router.get(
  '/users/:id',
  auth(USER_ROLE?.user, USER_ROLE?.admin),
  AuthControllers.getUser,
);
//Update user details
router.put(
  '/users/:id',
  auth(USER_ROLE?.user, USER_ROLE?.admin),
  validateRequest(AuthValidations.updateUserValidationSchema),
  AuthControllers.updateUser,
);

export const AuthRoutes = router;
