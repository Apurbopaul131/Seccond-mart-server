import express from 'express';

import auth from '../../middlewires/auth';
import validateRequest from '../../middlewires/validateRequest';
import { USER_ROLE } from '../user/user.constant';
import { ProductControllers } from './product.controller';
import { ProductValidatios } from './product.validation';
//create router object
const router = express.Router();

//create post api to handle post requsest from client
router.post(
  '/listings',
  auth(USER_ROLE?.user),
  validateRequest(ProductValidatios.createProductValidationSchema),
  ProductControllers.createProduct,
);
//create delete api to handle delete request from client
router.delete(
  '/listings/:id',
  auth(USER_ROLE?.user),
  ProductControllers.deleteSingleProduct,
);

//create update api to handle delete request from client
router.put(
  '/listings/:id',
  auth(USER_ROLE?.user),
  validateRequest(ProductValidatios.updateProductValidationSchema),
  ProductControllers.updateSingleProduct,
);
//create get api to handle get request from client
router.get('/listings', ProductControllers.getAllProduct);
router.get(
  '/listings/me',
  auth(USER_ROLE?.user),
  ProductControllers.getMeProducts,
);
//create get api to handle get request from client
router.get('/listings/:id', ProductControllers.getSingleProduct);

router.put(
  '/listings/mark-sold/:id',
  auth(USER_ROLE?.user),
  ProductControllers.markAsSold,
);

//export
export const productRouter = router;
