import mongoose, { Schema } from 'mongoose';
import { orderStatus } from './order.constants';
import { TOrder } from './order.interface';

//order schema
const OrderSchema = new mongoose.Schema<TOrder>(
  {
    buyerID: {
      type: Schema.Types.ObjectId,
      required: [true, 'buyerId is required'],
      ref: 'User',
      trim: true,
    },
    sellerID: {
      type: Schema.Types.ObjectId,
      required: [true, 'sellerID is required'],
      ref: 'User',
      trim: true,
    },
    itemID: {
      type: Schema.Types.ObjectId,
      required: [true, 'sellerID is required'],
      ref: 'Listing',
      trim: true,
    },

    status: {
      type: String,
      enum: {
        values: orderStatus,
        message: '{VALUE} is not supported',
      },
      default: 'pending',
    },
    transaction: {
      id: String,
      transactionStatus: String,
      bank_status: String,
      sp_code: String,
      sp_message: String,
      method: String,
      date_time: String,
      payment_status: String,
    },
  },
  {
    timestamps: true,
  },
);

// Create and export the model
const OrderModel = mongoose.model<TOrder>('Order', OrderSchema);

//export
export default OrderModel;
