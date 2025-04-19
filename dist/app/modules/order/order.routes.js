"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderRouter = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewires/auth"));
const validateRequest_1 = __importDefault(require("../../middlewires/validateRequest"));
const user_constant_1 = require("../user/user.constant");
const order_controller_1 = require("./order.controller");
const order_validation_1 = require("./order.validation");
//create router object
const router = express_1.default.Router();
//create a new transaction
router.post('/transactions', (0, auth_1.default)(user_constant_1.USER_ROLE.user), (0, validateRequest_1.default)(order_validation_1.OrderValidations.createOrderValidationSchema), order_controller_1.OrderControllers.createOrder);
//Fetch sales history
router.get('/sales/:userId', (0, auth_1.default)(user_constant_1.USER_ROLE.user), order_controller_1.OrderControllers.viewSales);
// Fetch purchase history
router.get('/purchases/:userId', (0, auth_1.default)(user_constant_1.USER_ROLE.user), order_controller_1.OrderControllers.viewPurchases);
//Update transaction status
router.put('/transactions/:id', (0, auth_1.default)(user_constant_1.USER_ROLE === null || user_constant_1.USER_ROLE === void 0 ? void 0 : user_constant_1.USER_ROLE.user), (0, validateRequest_1.default)(order_validation_1.OrderValidations.updateOrderValidationSchema), order_controller_1.OrderControllers.updateOrderStatus);
router.get('/transactions/verify', (0, auth_1.default)(user_constant_1.USER_ROLE.user), order_controller_1.OrderControllers.verifyPayment);
//export router
exports.orderRouter = router;
