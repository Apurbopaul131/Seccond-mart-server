import express from 'express';
import auth from '../../middlewires/auth';
import { USER_ROLE } from '../user/user.constant';
import { WishListControllers } from './wishlist.controller';

const router = express.Router();

router.put(
  '/wishlist',
  auth(USER_ROLE.user),
  WishListControllers.createWishlist,
);
router.get(
  '/wishlist/:userId',
  auth(USER_ROLE.user),
  WishListControllers.getWishlist,
);
router.delete(
  '/wishlist/:productId',
  auth(USER_ROLE.user),
  WishListControllers.deleteWishlist,
);
export const WishListRouter = router;
