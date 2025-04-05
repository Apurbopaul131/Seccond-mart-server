import mongoose from 'mongoose';
import { z } from 'zod';

// Define a validation schema using Zod
const createWishlistValidationSchema = z.object({
  userId: z.string().refine((id) => mongoose.Types.ObjectId.isValid(id), {
    message: 'Invalid userId format',
  }),
  items: z.array(
    z.string().refine((id) => mongoose.Types.ObjectId.isValid(id), {
      message: 'Invalid itemId format',
    }),
  ),
});
export const WishlistValidations = {
  createWishlistValidationSchema,
};
