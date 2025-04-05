import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../error/AppError';
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
  const result = await productQuery.modelQuery;
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
      'title userId condition brand price category image description status location',
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

//export
export const ProductServices = {
  getSingleProductToDb,
  getAllproductFromDB,
  getMeAllproductFromDB,
};
