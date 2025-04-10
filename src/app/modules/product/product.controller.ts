import { Request, Response } from 'express';
import catchAsync from '../../uitls/catchAsync';
import sendResponse from '../../uitls/sendResponse';
import { ProductServices } from './product.service';

//get single product
const getAllProduct = catchAsync(async (req: Request, res: Response) => {
  const { meta, result } = await ProductServices.getAllproductFromDB(req.query);
  //send response to client
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Products retrieved successfully',
    meta: meta,
    data: result,
  });
});
const getMeProducts = catchAsync(async (req: Request, res: Response) => {
  const { meta, result } = await ProductServices.getMeAllproductFromDB(
    req?.user?.userId,
    req.query,
  );

  //send response to client
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Products retrieved successfully',
    meta: meta,
    data: result,
  });
});
const getSingleProduct = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await ProductServices.getSingleProductToDb(id);

  //send response to client
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Product retrieved successfully',
    data: result,
  });
});

const markAsSold = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await ProductServices.markAsSoldIntoDB(id);

  //send response to client
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Mark as sold successfully.',
    data: result,
  });
});
//Export all functions
export const ProductControllers = {
  getSingleProduct,
  getAllProduct,
  getMeProducts,
  markAsSold,
};
