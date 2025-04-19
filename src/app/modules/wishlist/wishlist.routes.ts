import express from 'express';
import auth from '../../middlewires/auth';
import { USER_ROLE } from '../user/user.constant';
import { WishListControllers } from './wishlist.controller';

const router = express.Router();
//create or update the wishlist
router.put(
  '/wishlist',
  auth(USER_ROLE.user),
  WishListControllers.createWishlist,
);
//Retrive all wishlist
router.get(
  '/wishlist/:userId',
  auth(USER_ROLE.user),
  WishListControllers.getWishlist,
);
//Delele sepcific wishlist
router.delete(
  '/wishlist/:productId',
  auth(USER_ROLE.user),
  WishListControllers.deleteWishlist,
);
export const WishListRouter = router;
