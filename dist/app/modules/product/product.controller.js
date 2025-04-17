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
exports.ProductControllers = void 0;
const catchAsync_1 = __importDefault(require("../../uitls/catchAsync"));
const sendResponse_1 = __importDefault(require("../../uitls/sendResponse"));
const product_service_1 = require("./product.service");
const createProduct = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id, title, userId, condition, brand, price, category, images, description, status, } = yield product_service_1.ProductServices.createProductToDB(req.body);
    //send response to client
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: 'Product created successfully',
        data: {
            _id,
            title,
            userId,
            condition,
            brand,
            price,
            category,
            images,
            description,
            status,
        },
    });
}));
//get single product
const getAllProduct = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { meta, result } = yield product_service_1.ProductServices.getAllproductFromDB(req.query);
    //send response to client
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: 'Products retrieved successfully',
        meta: meta,
        data: result,
    });
}));
const getMeProducts = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { meta, result } = yield product_service_1.ProductServices.getMeAllproductFromDB((_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.userId, req.query);
    //send response to client
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: 'Products retrieved successfully',
        meta: meta,
        data: result,
    });
}));
const getSingleProduct = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield product_service_1.ProductServices.getSingleProductToDb(id);
    //send response to client
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: 'Product retrieved successfully',
        data: result,
    });
}));
const deleteSingleProduct = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield product_service_1.ProductServices.deleteSingleProductToDb(id);
    //send response to client
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: 'Product deleted successfully',
        data: result,
    });
}));
const updateSingleProduct = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idOfProduct = req.params.id;
    const updatedProductData = req.body;
    const result = yield product_service_1.ProductServices.updateSingleProductToDb(idOfProduct, updatedProductData);
    //send response to client
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: 'Product updated successfully.',
        data: result,
    });
}));
const markAsSold = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield product_service_1.ProductServices.markAsSoldIntoDB(id);
    //send response to client
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: 'Mark as sold successfully.',
        data: result,
    });
}));
//Export all functions
exports.ProductControllers = {
    getSingleProduct,
    getAllProduct,
    getMeProducts,
    markAsSold,
    createProduct,
    deleteSingleProduct,
    updateSingleProduct,
};
