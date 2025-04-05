import express from 'express';
import auth from '../../middlewires/auth';
import validateRequest from '../../middlewires/validateRequest';
import { ProductValidatios } from '../product/product.validation';
import { USER_ROLE } from '../user/user.constant';
import { AdminControllers } from './admin.controller';

//create router object
const router = express.Router();

//create post api to handle post requsest from client
router.post(
  '/listings',
  auth(USER_ROLE?.user),
  validateRequest(ProductValidatios.createProductValidationSchema),
  AdminControllers.createProduct,
);

//create delete api to handle delete request from client
router.delete(
  '/listings/:id',
  auth(USER_ROLE?.user),
  AdminControllers.deleteSingleProduct,
);

router.put(
  '/listings/:id',
  auth(USER_ROLE?.user),
  validateRequest(ProductValidatios.updateProductValidationSchema),
  AdminControllers.updateSingleProduct,
);

//user blocked by update route
router.patch(
  '/admin/users/:userId/block',
  auth(USER_ROLE.admin),
  AdminControllers.blockedUserByAdmin,
);
//export

export const AdminRouter = router;
