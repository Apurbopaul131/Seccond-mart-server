import mongoose from 'mongoose';
import AppError from '../../error/AppError';
import { User } from '../user/user.model';
import { IWishlist } from './wishlist.interface';
import { Wishlist } from './wishlist.model';

const createWishlistIntoDB = async (payload: IWishlist) => {
  if (!payload?.userId) {
    throw new AppError(404, 'User does not login,please login..');
  }
  const objectUserId = new mongoose.Types.ObjectId(payload?.userId);
  const objectItems = payload?.items?.map(
    (id) => new mongoose.Types.ObjectId(id),
  );
  const result = await Wishlist.findOne({ userId: payload.userId });
  const modifiedPayload = {
    userId: objectUserId,
    items: objectItems,
  };
  if (!result) {
    const createdWishlist = await Wishlist.create(modifiedPayload);
    return createdWishlist;
  } else {
    const isElementAdded = await Wishlist.find({
      items: { $elemMatch: { $eq: payload.items[0] } },
    });
    if (isElementAdded.length > 0) {
      throw new AppError(409, 'Product already added into wishlist.');
    }
    const updatedWishlist = await Wishlist.findOneAndUpdate(
      { userId: objectUserId },
      { $addToSet: { items: objectItems } },
      { new: true },
    );
    return updatedWishlist;
  }
};
const getWishlistIntoDB = async (userId: string) => {
  const isExistUser = await User.findById(userId);
  if (!isExistUser) {
    throw new AppError(404, 'User not found');
  }
  if (isExistUser?.isBlocked) {
    throw new AppError(404, 'User is blocked');
  }
  const result = await Wishlist.findOne({ userId })
    .select('_id userId items')
    .populate({
      path: 'userId',
      select: '_id name email phoneNumber role isBlocked',
    })
    .populate({
      path: 'items',
      select:
        'title userId condition brand price category images description status location',
    });
  if (!result) {
    throw new AppError(404, 'No wishlist for this user');
  }
  return result;
};
const deleteWishlitFromDB = async (userId: string, productId: string) => {
  const existWishlist = await Wishlist.findOne({ userId });
  if (!existWishlist) {
    throw new AppError(404, 'Wishlist not found.');
  }
  const updatedWishlist = await Wishlist.findOneAndUpdate(
    { userId },
    { $pull: { items: productId } },
    { new: true },
  );
  return updatedWishlist;
};
export const WishListServices = {
  createWishlistIntoDB,
  getWishlistIntoDB,
  deleteWishlitFromDB,
};
