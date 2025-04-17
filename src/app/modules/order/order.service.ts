import { JwtPayload } from 'jsonwebtoken';
import AppError from '../../error/AppError';
import { ListingModel } from '../product/product.model';
import { TOrder, TOrderStatus } from './order.interface';

import { User } from '../user/user.model';
import OrderModel from './order.model';
import { OrderUitls } from './order.uitls';

//Create an order to orders collecion
const createOrderIntoDB = async (
  userData: JwtPayload,
  orderData: TOrder,
  client_ip: string,
) => {
  const user = await User.findById(userData?.userId);
  //check authenticate user
  if (userData?.userId !== orderData?.buyerID) {
    throw new AppError(403, 'Invalid credentials');
  }
  if (!user) {
    throw new AppError(404, 'Product not found!');
  }
  const isProductExist = await ListingModel.findOne({
    _id: orderData?.itemID,
    isDeleted: false,
  });

  if (userData?.userId === isProductExist?.userId.toString()) {
    throw new AppError(409, 'User can not buy his own product.');
  }
  if (!isProductExist) {
    throw new AppError(404, 'Product not found!');
  }
  const isOrderCompleted = await OrderModel.findOne({
    itemID: orderData?.itemID,
    status: 'completed',
  });
  if (isOrderCompleted) {
    throw new AppError(
      409,
      'Payment are alrady completed but mark as sold yet.',
    );
  }

  const orderedProduct = await OrderModel.create(orderData);
  // const existedBuyer = await User?.findById(orderedProduct?.buyerID);
  const existedOrderProduct = await ListingModel.findById(
    orderedProduct?.itemID,
  );

  //payment integration
  const paymentPaylod = {
    amount: isProductExist?.price,
    order_id: orderedProduct?._id,
    currency: 'BDT',
    customer_name: user?.name,
    customer_address: existedOrderProduct?.location,
    client_ip: client_ip,
    customer_phone: user?.phoneNumber,
    customer_city: existedOrderProduct?.location,
    customer_email: user?.email,
  };
  const payment = await OrderUitls.makePaymentAsync(paymentPaylod);
  if (payment.transactionStatus) {
    await OrderModel.findByIdAndUpdate(orderedProduct?._id, {
      transaction: {
        id: payment.sp_order_id,
        transactionStatus: payment.transactionStatus,
      },
    });
  }
  return payment.checkout_url;
};

const viewAllPurchaseFromDB = async (userId: string) => {
  const result = await OrderModel.find({
    buyerID: userId,
  })
    .select('buyerID sellerID itemID status createdAt transaction')
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
    .select('buyerID sellerID itemID status createdAt transaction')
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

const verifyPayment = async (order_id: string) => {
  const verifiedPayment = await OrderUitls.verifiedPaymentAsync(order_id);
  if (verifiedPayment.length) {
    await OrderModel.findOneAndUpdate(
      {
        'transaction.id': order_id,
      },
      {
        'transaction.bank_status': verifiedPayment[0].bank_status,
        'transaction.sp_code': verifiedPayment[0].sp_code,
        'transaction.transactionStatus': verifiedPayment[0].transaction_status,
        'transaction.sp_message': verifiedPayment[0].sp_message,
        'transaction.method': verifiedPayment[0].method,
        'transaction.date_time': verifiedPayment[0].date_time,
        'transaction.payment_status': verifiedPayment[0].bank_status,
        status:
          verifiedPayment[0]?.bank_status === 'Success'
            ? 'completed'
            : 'pending',
      },
    );
  }

  return verifiedPayment;
};
export const OrderServices = {
  createOrderIntoDB,
  viewAllPurchaseFromDB,
  viewAllSalesFromDB,
  updateOrderStatusIntoDB,
  verifyPayment,
};
