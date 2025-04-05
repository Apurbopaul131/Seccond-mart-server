import { Types } from 'mongoose';

export interface IWishlist {
  userId: Types.ObjectId;
  items: Types.ObjectId[];
}
