import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../error/AppError';
import OrderModel from '../order/order.model';
import { searchableFields } from './product.constant';
import { ListingModel } from './product.model';

// get all product form DB
const getAllproductFromDB = async (query: Record<string, unknown>) => {
  const productQuery = new QueryBuilder(
    ListingModel.find({ isDeleted: false }),
    query,
  )
    .search(searchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();
  const meta = await productQuery.countTotal();
  const result = await productQuery.modelQuery.populate({
    path: 'userId',
    select: 'name email phoneNumber role isBlocked',
  });
  return {
    meta,
    result,
  };
};

const getMeAllproductFromDB = async (
  userId: string,
  query: Record<string, unknown>,
) => {
  const productQuery = new QueryBuilder(
    ListingModel.find({ userId, isDeleted: false }),
    query,
  )
    .search(searchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();
  const meta = await productQuery.countTotal();
  const result = await productQuery.modelQuery;
  return {
    meta,
    result,
  };
};
// get specific product by id from db
const getSingleProductToDb = async (id: string) => {
  const isDeleted = await ListingModel.findOne({
    _id: id,
    isDeleted: true,
  });
  if (isDeleted) {
    throw new AppError(404, 'Product not found!');
  }
  const result = await ListingModel.findById(id)
    .select(
      'title userId condition brand price category images description status location',
    )
    .populate({
      path: 'userId',
      select: 'name email phoneNumber role isBlocked',
    });
  if (!result) {
    throw new AppError(404, 'Product not found!');
  }
  return result;
};
const markAsSoldIntoDB = async (itemID: string) => {
  const prodcutExistInTransaction = await OrderModel.findOne({ itemID });
  if (!prodcutExistInTransaction) {
    throw new AppError(404, 'Payment are not initiated yet.');
  }
  if (prodcutExistInTransaction?.status === 'pending') {
    throw new AppError(202, 'Payment status is pending.');
  }
  const result = await ListingModel.findByIdAndUpdate(
    itemID,
    { status: 'sold' },
    { new: true },
  );
  return result;
};
//export
export const ProductServices = {
  getSingleProductToDb,
  getAllproductFromDB,
  getMeAllproductFromDB,
  markAsSoldIntoDB,
};
