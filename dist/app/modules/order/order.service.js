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
exports.OrderServices = void 0;
const AppError_1 = __importDefault(require("../../error/AppError"));
const product_model_1 = require("../product/product.model");
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const user_model_1 = require("../user/user.model");
const order_contant_1 = require("./order.contant");
const order_model_1 = __importDefault(require("./order.model"));
const order_uitls_1 = require("./order.uitls");
//Create an order to orders collecion
const createOrderIntoDB = (userData, orderData, client_ip) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findById(userData === null || userData === void 0 ? void 0 : userData.userId);
    //check authenticate user
    if ((userData === null || userData === void 0 ? void 0 : userData.userId) !== (orderData === null || orderData === void 0 ? void 0 : orderData.buyerID)) {
        throw new AppError_1.default(403, 'Invalid credentials');
    }
    if (!user) {
        throw new AppError_1.default(404, 'Product not found!');
    }
    const isProductExist = yield product_model_1.ListingModel.findOne({
        _id: orderData === null || orderData === void 0 ? void 0 : orderData.itemID,
        isDeleted: false,
    });
    if ((userData === null || userData === void 0 ? void 0 : userData.userId) === (isProductExist === null || isProductExist === void 0 ? void 0 : isProductExist.userId.toString())) {
        throw new AppError_1.default(409, 'User can not buy his own product.');
    }
    if (!isProductExist) {
        throw new AppError_1.default(404, 'Product not found!');
    }
    const isOrderCompleted = yield order_model_1.default.findOne({
        itemID: orderData === null || orderData === void 0 ? void 0 : orderData.itemID,
        status: 'completed',
    });
    if (isOrderCompleted) {
        throw new AppError_1.default(409, 'Payment are alrady completed but mark as sold yet.');
    }
    const orderedProduct = yield order_model_1.default.create(orderData);
    // const existedBuyer = await User?.findById(orderedProduct?.buyerID);
    const existedOrderProduct = yield product_model_1.ListingModel.findById(orderedProduct === null || orderedProduct === void 0 ? void 0 : orderedProduct.itemID);
    //payment integration
    const paymentPaylod = {
        amount: isProductExist === null || isProductExist === void 0 ? void 0 : isProductExist.price,
        order_id: orderedProduct === null || orderedProduct === void 0 ? void 0 : orderedProduct._id,
        currency: 'BDT',
        customer_name: user === null || user === void 0 ? void 0 : user.name,
        customer_address: existedOrderProduct === null || existedOrderProduct === void 0 ? void 0 : existedOrderProduct.location,
        client_ip: client_ip,
        customer_phone: user === null || user === void 0 ? void 0 : user.phoneNumber,
        customer_city: existedOrderProduct === null || existedOrderProduct === void 0 ? void 0 : existedOrderProduct.location,
        customer_email: user === null || user === void 0 ? void 0 : user.email,
    };
    const payment = yield order_uitls_1.OrderUitls.makePaymentAsync(paymentPaylod);
    if (payment.transactionStatus) {
        yield order_model_1.default.findByIdAndUpdate(orderedProduct === null || orderedProduct === void 0 ? void 0 : orderedProduct._id, {
            transaction: {
                id: payment.sp_order_id,
                transactionStatus: payment.transactionStatus,
            },
        });
    }
    return payment.checkout_url;
});
const viewAllPurchaseFromDB = (userId, query) => __awaiter(void 0, void 0, void 0, function* () {
    // const result = await OrderModel.find({
    //   buyerID: userId,
    // })
    //   .select('buyerID sellerID itemID status createdAt transaction')
    //   .populate({
    //     path: 'buyerID sellerID',
    //     select: 'name email phoneNumber role isBlocked',
    //   })
    //   .populate({
    //     path: 'itemID',
    //     select:
    //       'title userId condition brand price category images description status location isDeleted',
    //   });
    const productQuery = new QueryBuilder_1.default(order_model_1.default.find({
        buyerID: userId,
    }), query)
        .search(order_contant_1.historySearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();
    const meta = yield productQuery.countTotal();
    const result = yield productQuery.modelQuery
        .select('buyerID sellerID itemID status createdAt transaction')
        .populate({
        path: 'buyerID sellerID',
        select: 'name email phoneNumber role isBlocked',
    })
        .populate({
        path: 'itemID',
        select: 'title userId condition brand price category images description status location isDeleted',
    });
    return {
        meta,
        result,
    };
});
const viewAllSalesFromDB = (userId, query) => __awaiter(void 0, void 0, void 0, function* () {
    // const result = await OrderModel.find({
    //   sellerID: userId,
    // })
    //   .select('buyerID sellerID itemID status createdAt transaction')
    //   .populate({
    //     path: 'buyerID sellerID',
    //     select: 'name email phoneNumber role isBlocked',
    //   })
    //   .populate({
    //     path: 'itemID',
    //     select:
    //       'title userId condition brand price category images description status location isDeleted',
    //   });
    // return result;
    const productQuery = new QueryBuilder_1.default(order_model_1.default.find({
        sellerID: userId,
    }), query)
        .search(order_contant_1.historySearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();
    const meta = yield productQuery.countTotal();
    const result = yield productQuery.modelQuery
        .select('buyerID sellerID itemID status createdAt transaction')
        .populate({
        path: 'buyerID sellerID',
        select: 'name email phoneNumber role isBlocked',
    })
        .populate({
        path: 'itemID',
        select: 'title userId condition brand price category images description status location isDeleted',
    });
    return {
        meta,
        result,
    };
});
const updateOrderStatusIntoDB = (orderID, status) => __awaiter(void 0, void 0, void 0, function* () {
    const isOrderExist = yield order_model_1.default.findById(orderID);
    if (!isOrderExist) {
        throw new AppError_1.default(404, 'Order not found!');
    }
    const result = yield order_model_1.default.findByIdAndUpdate(orderID, status, {
        new: true,
    });
    return result;
});
const verifyPayment = (order_id) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const verifiedPayment = yield order_uitls_1.OrderUitls.verifiedPaymentAsync(order_id);
    if (verifiedPayment.length) {
        yield order_model_1.default.findOneAndUpdate({
            'transaction.id': order_id,
        }, {
            'transaction.bank_status': verifiedPayment[0].bank_status,
            'transaction.sp_code': verifiedPayment[0].sp_code,
            'transaction.transactionStatus': verifiedPayment[0].transaction_status,
            'transaction.sp_message': verifiedPayment[0].sp_message,
            'transaction.method': verifiedPayment[0].method,
            'transaction.date_time': verifiedPayment[0].date_time,
            'transaction.payment_status': verifiedPayment[0].bank_status,
            status: ((_a = verifiedPayment[0]) === null || _a === void 0 ? void 0 : _a.bank_status) === 'Success'
                ? 'completed'
                : 'pending',
        });
    }
    return verifiedPayment;
});
exports.OrderServices = {
    createOrderIntoDB,
    viewAllPurchaseFromDB,
    viewAllSalesFromDB,
    updateOrderStatusIntoDB,
    verifyPayment,
};
