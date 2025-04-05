import mongoose from 'mongoose';
import { z } from 'zod';
import { orderStatus } from './order.constants';

//Order validation schema
const createOrderValidationSchema = z.object({
  body: z.object({
    buyerID: z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
      message: 'Invalid buyerId',
    }),
    sellerID: z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
      message: 'Invalid sellerId',
    }),
    itemID: z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
      message: 'Invalid sellerId',
    }),
    status: z
      .enum([...orderStatus] as [string, ...string[]], {
        message: 'Status must be pending | shipping',
      })
      .optional(),
  }),
});
const updateOrderValidationSchema = z.object({
  body: z.object({
    status: z.enum([...orderStatus] as [string, ...string[]], {
      message: 'Status must be pending | completed',
    }),
  }),
});
export const OrderValidations = {
  createOrderValidationSchema,
  updateOrderValidationSchema,
};
