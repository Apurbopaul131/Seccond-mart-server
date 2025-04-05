import { JwtPayload } from 'jsonwebtoken';
import AppError from '../../error/AppError';
import { ListingModel } from '../product/product.model';
import { TOrder, TOrderStatus } from './order.interface';

import { User } from '../user/user.model';
import OrderModel from './order.model';

//Create an order to orders collecion
const createOrderIntoDB = async (userData: JwtPayload, orderData: TOrder) => {
  const user = await User.findById(userData?.userId);
  if (!user) {
    throw new AppError(404, 'Product not found!');
  }
  const isDeleted = await ListingModel.findOne({
    _id: orderData?.itemID,
    isDeleted: true,
  });
  if (isDeleted) {
    throw new AppError(404, 'Product not found!');
  }

  const orderedProduct = await OrderModel.create(orderData);
  return orderedProduct;
};

const viewAllPurchaseFromDB = async (userId: string) => {
  const result = await OrderModel.find({
    buyerID: userId,
  })
    .select('buyerID sellerID itemID status')
    .populate({
      path: 'buyerID sellerID',
      select: 'name email phoneNumber role isBlocked',
    })
    .populate({
      path: 'itemID',
      select:
        'title userId condition brand price category images description status location isDeleted',
    });
  return result;
};

const viewAllSalesFromDB = async (userId: string) => {
  const result = await OrderModel.find({
    sellerID: userId,
  })
    .select('buyerID sellerID itemID status')
    .populate({
      path: 'buyerID sellerID',
      select: 'name email phoneNumber role isBlocked',
    })
    .populate({
      path: 'itemID',
      select:
        'title userId condition brand price category images description status location isDeleted',
    });
  return result;
};

const updateOrderStatusIntoDB = async (
  orderID: string,
  status: { status: TOrderStatus },
) => {
  const isOrderExist = await OrderModel.findById(orderID);
  if (!isOrderExist) {
    throw new AppError(404, 'Order not found!');
  }
  const result = await OrderModel.findByIdAndUpdate(orderID, status, {
    new: true,
  });
  return result;
};
// const getMeOrdersFromDB = async (userEmail: string) => {
//   const result = await OrderModel.find({ email: userEmail })
//     .select('email product quantity totalPrice status transaction')
//     .populate({
//       path: 'product',
//       select: 'name barnd price category image description quantity inStock',
//     });
//   return result;
// };

// const acceptOrderIntoDB = async (orderId: string) => {
//   const isOrderExist = await OrderModel.findById(orderId);
//   if (!isOrderExist) {
//     throw new AppError(404, 'Order does not exist.');
//   }
//   const updatedStatus = await OrderModel.findByIdAndUpdate(
//     orderId,
//     { status: 'Shipping' },
//     { new: true },
//   )
//     .select('email product quantity totalPrice status')
//     .populate({
//       path: 'product',
//       select: 'name barnd price category image description quantity inStock',
//     });
//   return updatedStatus;
// };

// const cancleOrderIntoDB = async (orderId: string) => {
//   const isOrderExist = await OrderModel.findById(orderId);
//   if (!isOrderExist) {
//     throw new AppError(404, 'Order does not exist.');
//   }
//   const deletedOrder = await OrderModel.findByIdAndDelete(orderId)
//     .select('email product quantity totalPrice status')
//     .populate({
//       path: 'product',
//       select: 'name barnd price category image description quantity inStock',
//     });
//   return deletedOrder;
// };

// const verifyPayment = async (order_id: string) => {
//   const verifiedPayment = await orderUitls.verifiedPaymentAsync(order_id);
//   if (verifiedPayment.length) {
//     await OrderModel.findOneAndUpdate(
//       {
//         'transaction.id': order_id,
//       },
//       {
//         'transaction.bank_status': verifiedPayment[0].bank_status,
//         'transaction.sp_code': verifiedPayment[0].sp_code,
//         'transaction.transactionStatus': verifiedPayment[0].transaction_status,
//         'transaction.sp_message': verifiedPayment[0].sp_message,
//         'transaction.method': verifiedPayment[0].method,
//         'transaction.date_time': verifiedPayment[0].date_time,
//         'transaction.payment_status': verifiedPayment[0].bank_status,
//       },
//     );
//   }
//   //payment success then reduce quantity and update the stock status
//   if (verifiedPayment[0].bank_status === 'Success') {
//     const orderedData = await OrderModel.findOne({
//       'transaction.id': order_id,
//     });
//     const existingProduct = await ListingModel.findById(orderedData?.product);
//     if (orderedData && existingProduct) {
//       const remainingProductQuantity =
//         existingProduct?.quantity - orderedData?.quantity;
//       const updatedProduct: Pick<TStationeryProduct, 'quantity' | 'inStock'> = {
//         quantity: remainingProductQuantity,
//         inStock: remainingProductQuantity > 0 ? true : false,
//       };
//       //update product data
//       await ListingModel.findByIdAndUpdate(
//         existingProduct?._id,
//         updatedProduct,
//       );
//     }
//   }
//   return verifiedPayment;
// };
export const OrderServices = {
  createOrderIntoDB,
  viewAllPurchaseFromDB,
  viewAllSalesFromDB,
  updateOrderStatusIntoDB,
};
