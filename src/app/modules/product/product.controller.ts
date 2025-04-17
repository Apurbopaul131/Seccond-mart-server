import { Request, Response } from 'express';
import catchAsync from '../../uitls/catchAsync';
import sendResponse from '../../uitls/sendResponse';
import { ProductServices } from './product.service';

const createProduct = catchAsync(async (req: Request, res: Response) => {
  const {
    _id,
    title,
    userId,
    condition,
    brand,
    price,
    category,
    images,
    description,
    status,
  } = await ProductServices.createProductToDB(req.body);

  //send response to client
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Product created successfully',
    data: {
      _id,
      title,
      userId,
      condition,
      brand,
      price,
      category,
      images,
      description,
      status,
    },
  });
});
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

const deleteSingleProduct = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await ProductServices.deleteSingleProductToDb(id);

  //send response to client
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Product deleted successfully',
    data: result,
  });
});
const updateSingleProduct = catchAsync(async (req: Request, res: Response) => {
  const idOfProduct = req.params.id;
  const updatedProductData = req.body;

  const result = await ProductServices.updateSingleProductToDb(
    idOfProduct,
    updatedProductData,
  );

  //send response to client
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Product updated successfully.',
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
  createProduct,
  deleteSingleProduct,
  updateSingleProduct,
};
