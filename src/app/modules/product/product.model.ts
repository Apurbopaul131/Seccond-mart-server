import mongoose, { Schema } from 'mongoose';
import {
  productCategories,
  productCondition,
  productStatus,
} from './product.constant';
import { ProductModel, TStationeryProduct } from './product.interface';

//Stationary product schema
const StationeryProductSchema = new mongoose.Schema<
  TStationeryProduct,
  ProductModel
>(
  {
    title: {
      type: String,
      required: [true, 'name is required'],
      trim: true, // Removes extra spaces
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'UserId is requierd'],
    },
    condition: {
      type: String,
      required: [true, 'codition is required'],
      enum: {
        values: productCondition,
        message: '{VALUE} is not supported.',
      },
    },
    brand: {
      type: String,
      required: [true, 'brand is required'],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'price is required'],
      min: [0, 'Price must be a positive number'],
    },
    category: {
      type: String,
      required: [true, 'category is required'],
      enum: {
        values: productCategories,
        message: '{VALUE} is not supported.',
      },
    },
    images: {
      type: [String],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'description is required'],
      trim: true,
    },
    status: {
      type: String,
      required: [true, 'Status is required'],
      enum: {
        values: productStatus,
        message: '{VALUE} is not supported.',
      },
      default: 'available',
    },
    location: {
      type: String,
      required: [true, 'lcoation is required'],
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields automatically
  },
);

//Custom statics method that is used for check product is exist or not
StationeryProductSchema.statics.findProductById = async function (
  productId: string,
) {
  const existingProduct = await ListingModel.findById(productId);
  return existingProduct;
};
//create model and export
export const ListingModel = mongoose.model<TStationeryProduct, ProductModel>(
  'Listing',
  StationeryProductSchema,
);
