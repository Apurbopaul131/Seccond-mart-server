import express from 'express';

import auth from '../../middlewires/auth';
import validateRequest from '../../middlewires/validateRequest';
import { USER_ROLE } from '../user/user.constant';
import { ProductControllers } from './product.controller';
import { ProductValidatios } from './product.validation';
//create router object
const router = express.Router();

//Create a new product listing
router.post(
  '/listings',
  auth(USER_ROLE?.user),
  validateRequest(ProductValidatios.createProductValidationSchema),
  ProductControllers.createProduct,
);
//Remove a listing
router.delete(
  '/listings/:id',
  auth(USER_ROLE?.user, USER_ROLE?.admin),
  ProductControllers.deleteSingleProduct,
);

//Update listing details
router.put(
  '/listings/:id',
  auth(USER_ROLE?.user),
  validateRequest(ProductValidatios.updateProductValidationSchema),
  ProductControllers.updateSingleProduct,
);
//Retrieve all available listings
router.get('/listings', ProductControllers.getAllProduct);
//Retrive all specific user listings
router.get(
  '/listings/me',
  auth(USER_ROLE?.user),
  ProductControllers.getMeProducts,
);
//Retrieve details of a specific listing.
router.get('/listings/:id', ProductControllers.getSingleProduct);

//Mark as sold route
router.put(
  '/listings/mark-sold/:id',
  auth(USER_ROLE?.user),
  ProductControllers.markAsSold,
);

//export
export const productRouter = router;
