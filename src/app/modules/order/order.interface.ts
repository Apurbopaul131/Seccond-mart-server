import { Types } from 'mongoose';

//order status type
export type TOrderStatus = 'pending' | 'completed';

//Order type

export type TOrder = {
  buyerID: Types.ObjectId;
  sellerID: Types.ObjectId;
  itemID: Types.ObjectId;
  status: TOrderStatus;
  transaction: {
    id: string;
    transactionStatus: string;
    bank_status: string;
    sp_code: string;
    sp_message: string;
    method: string;
    date_time: string;
    payment_status: string;
  };
};
