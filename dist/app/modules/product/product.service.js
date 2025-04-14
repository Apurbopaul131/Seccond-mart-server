"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductServices = void 0;
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const AppError_1 = __importDefault(require("../../error/AppError"));
const order_model_1 = __importDefault(require("../order/order.model"));
const product_constant_1 = require("./product.constant");
const product_model_1 = require("./product.model");
// get all product form DB
const getAllproductFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const productQuery = new QueryBuilder_1.default(product_model_1.ListingModel.find({ isDeleted: false }), query)
        .search(product_constant_1.searchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();
    const meta = yield productQuery.countTotal();
    const result = yield productQuery.modelQuery.populate({
        path: 'userId',
        select: 'name email phoneNumber role isBlocked',
    });
    return {
        meta,
        result,
    };
});
const getMeAllproductFromDB = (userId, query) => __awaiter(void 0, void 0, void 0, function* () {
    const productQuery = new QueryBuilder_1.default(product_model_1.ListingModel.find({ userId, isDeleted: false }), query)
        .search(product_constant_1.searchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();
    const meta = yield productQuery.countTotal();
    const result = yield productQuery.modelQuery;
    return {
        meta,
        result,
    };
});
// get specific product by id from db
const getSingleProductToDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isDeleted = yield product_model_1.ListingModel.findOne({
        _id: id,
        isDeleted: true,
    });
    if (isDeleted) {
        throw new AppError_1.default(404, 'Product not found!');
    }
    const result = yield product_model_1.ListingModel.findById(id)
        .select('title userId condition brand price category images description status location')
        .populate({
        path: 'userId',
        select: 'name email phoneNumber role isBlocked',
    });
    if (!result) {
        throw new AppError_1.default(404, 'Product not found!');
    }
    return result;
});
const markAsSoldIntoDB = (itemID) => __awaiter(void 0, void 0, void 0, function* () {
    const prodcutExistInTransaction = yield order_model_1.default.findOne({ itemID });
    if (!prodcutExistInTransaction) {
        throw new AppError_1.default(404, 'Payment are not initiated yet.');
    }
    if ((prodcutExistInTransaction === null || prodcutExistInTransaction === void 0 ? void 0 : prodcutExistInTransaction.status) === 'pending') {
        throw new AppError_1.default(202, 'Payment status is pending.');
    }
    const result = yield product_model_1.ListingModel.findByIdAndUpdate(itemID, { status: 'sold' }, { new: true });
    return result;
});
//export
exports.ProductServices = {
    getSingleProductToDb,
    getAllproductFromDB,
    getMeAllproductFromDB,
    markAsSoldIntoDB,
};
