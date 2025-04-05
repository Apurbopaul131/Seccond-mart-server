import { Request, Response } from 'express';
import catchAsync from '../../uitls/catchAsync';
import sendResponse from '../../uitls/sendResponse';
import { WishListServices } from './wishlist.service';

const createWishlist = catchAsync(async (req: Request, res: Response) => {
  const result = await WishListServices.createWishlistIntoDB(req.body);

  //send response to client
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'WishList created successfully',
    data: result,
  });
});

const getWishlist = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.params;
  const result = await WishListServices.getWishlistIntoDB(userId);

  //send response to client
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'WishList retrived successfully',
    data: result,
  });
});

const deleteWishlist = catchAsync(async (req: Request, res: Response) => {
  const { productId } = req.params;
  const { userId } = req.user;
  const result = await WishListServices.deleteWishlitFromDB(userId, productId);

  //send response to client
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Product Deleted successfully from wishlit.',
    data: result,
  });
});
export const WishListControllers = {
  createWishlist,
  getWishlist,
  deleteWishlist,
};
