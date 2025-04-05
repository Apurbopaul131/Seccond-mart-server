import { Request, Response } from 'express';
import catchAsync from '../../uitls/catchAsync';
import sendResponse from '../../uitls/sendResponse';
import { AdminServices } from './admin.service';

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
  } = await AdminServices.createProductToDB(req.body);

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

const updateSingleProduct = catchAsync(async (req: Request, res: Response) => {
  const idOfProduct = req.params.id;
  const updatedProductData = req.body;

  const result = await AdminServices.updateSingleProductToDb(
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

const deleteSingleProduct = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await AdminServices.deleteSingleProductToDb(id);

  //send response to client
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Product deleted successfully',
    data: result,
  });
});

const blockedUserByAdmin = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.params;
  await AdminServices.blockedUserByAdminIntoDB(req.user, userId);
  //send response to client
  sendResponse(res, {
    success: true,
    message: 'User blocked successfully',
    statusCode: 200,
  });
});
export const AdminControllers = {
  createProduct,
  updateSingleProduct,
  deleteSingleProduct,
  blockedUserByAdmin,
};
