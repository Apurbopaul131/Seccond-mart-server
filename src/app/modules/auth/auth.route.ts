import express from 'express';
import auth from '../../middlewires/auth';
import validateRequest from '../../middlewires/validateRequest';
import { USER_ROLE } from '../user/user.constant';
import { UserValidations } from '../user/user.validation';
import { AuthControllers } from './auth.controller';
import { AuthValidations } from './auth.validation';

const router = express.Router();

router.post(
  '/auth/register',
  validateRequest(UserValidations.createUserValidationSchema),
  AuthControllers.registerUser,
);
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
router.get('/users/:id', auth(USER_ROLE?.user), AuthControllers.getUser);

router.put(
  '/users/:id',
  auth(USER_ROLE?.user),
  validateRequest(AuthValidations.updateUserValidationSchema),
  AuthControllers.updateUser,
);

export const AuthRoutes = router;
