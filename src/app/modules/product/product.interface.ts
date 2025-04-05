import { Types } from 'mongoose';
/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';

type TProductCondition =
  | 'New'
  | 'Like New'
  | 'Excellent'
  | 'Good'
  | 'Fair'
  | 'For Parts';
type TCategory =
  | 'Electronics'
  | 'Home Appliances'
  | 'Furniture'
  | 'Clothing and Accessories'
  | 'Automobiles'
  | 'Books and Stationery'
  | 'Sports and Outdoor'
  | 'Toys and Baby Products'
  | 'Health and Beauty'
  | 'Musical Instruments'
  | 'Gaming and Entertainment'
  | 'Other';
type availableLocation =
  | 'Dhaka'
  | 'Chattogram'
  | 'Rajshahi'
  | 'Khulna'
  | 'Barishal'
  | 'Sylhet'
  | 'Rangpur'
  | 'Mymensingh';
type TProductStatus = 'available' | 'sold';
//create interface and export
export type TStationeryProduct = {
  title: string;
  userId: Types.ObjectId;
  condition: TProductCondition;
  brand: string;
  price: number;
  category: TCategory;
  images: string[];
  description: string;
  status: TProductStatus;
  isDeleted: boolean;
  location: availableLocation;
};
export interface ProductModel extends Model<TStationeryProduct> {
  findProductById(productId: string): Promise<TStationeryProduct>;
}
