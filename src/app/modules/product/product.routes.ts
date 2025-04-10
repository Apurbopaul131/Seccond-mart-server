import express from 'express';

import auth from '../../middlewires/auth';
import { USER_ROLE } from '../user/user.constant';
import { ProductControllers } from './product.controller';
//create router object
const router = express.Router();

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
