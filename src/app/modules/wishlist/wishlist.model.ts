import { model, Schema } from 'mongoose';
import { IWishlist } from './wishlist.interface';

const WishlistSchema = new Schema<IWishlist>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User', // Reference to the User model
      required: true,
    },
    items: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Listing',
      },
    ],
  },
  { timestamps: true },
);

export const Wishlist = model<IWishlist>('Wishlist', WishlistSchema);
