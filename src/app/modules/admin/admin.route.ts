import express from 'express';
import auth from '../../middlewires/auth';
import { USER_ROLE } from '../user/user.constant';
import { AdminControllers } from './admin.controller';

//create router object
const router = express.Router();

// retrieve all users route
router.get('/admin/users', auth(USER_ROLE.admin), AdminControllers.getAllUsers);
//user blocked by update route
router.patch(
  '/admin/users/:userId/block',
  auth(USER_ROLE.admin),
  AdminControllers.blockedUserByAdmin,
);
//export

export const AdminRouter = router;
