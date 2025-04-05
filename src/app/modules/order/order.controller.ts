import { Request, Response } from 'express';
import catchAsync from '../../uitls/catchAsync';
import sendResponse from '../../uitls/sendResponse';
import { OrderServices } from './order.service';
// import { AdminServices } from '../admin/admin.service';
// import { TStationeryProduct } from '../product/product.interface';

const createOrder = catchAsync(async (req: Request, res: Response) => {
  const result = await OrderServices.createOrderIntoDB(req.user, req.body);
  //send response to client
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Order created successfully.',
    data: result,
  });
});

//view all order
const viewPurchases = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.params;
  const result = await OrderServices.viewAllPurchaseFromDB(userId);
  //send response to client
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Purchases history retrived successfully.',
    data: result,
  });
});

const viewSales = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.params;
  const result = await OrderServices.viewAllSalesFromDB(userId);
  //send response to client
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Sales history retrived successfully.',
    data: result,
  });
});

const updateOrderStatus = async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await OrderServices.updateOrderStatusIntoDB(id, req.body);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Order updated successfully',
    data: result,
  });
};
//view user specific orders
// const getMeOrders = catchAsync(async (req: Request, res: Response) => {
//   const result = await OrderServices.getMeOrdersFromDB(req?.user?.email);
//   //send response to client
//   sendResponse(res, {
//     success: true,
//     statusCode: 200,
//     message: 'User orders retrived successfully.',
//     data: result,
//   });
// });

// const acceptOrder = catchAsync(async (req: Request, res: Response) => {
//   const { orderId } = req.params;
//   const result = await OrderServices.acceptOrderIntoDB(orderId);
//   //send response to client
//   sendResponse(res, {
//     success: true,
//     statusCode: 200,
//     message: 'Order accepted successfully.',
//     data: result,
//   });
// });

// const cancleOrder = catchAsync(async (req: Request, res: Response) => {
//   const { orderId } = req.params;
//   const result = await OrderServices.cancleOrderIntoDB(orderId);
//   //send response to client
//   sendResponse(res, {
//     success: true,
//     statusCode: 200,
//     message: 'Order deleted successfully.',
//     data: result,
//   });
// });

//Verify the payment successful or not
// const verifyPayment = catchAsync(async (req, res) => {
//   const order = await OrderServices.verifyPayment(req.query.order_id as string);

//   sendResponse(res, {
//     success: true,
//     statusCode: 200,
//     message: 'Order verified successfully',
//     data: order,
//   });
// });

//export
export const OrderControllers = {
  createOrder,
  viewPurchases,
  viewSales,
  updateOrderStatus,
};
