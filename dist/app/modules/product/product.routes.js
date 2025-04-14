"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRouter = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewires/auth"));
const user_constant_1 = require("../user/user.constant");
const product_controller_1 = require("./product.controller");
//create router object
const router = express_1.default.Router();
//create get api to handle get request from client
router.get('/listings', product_controller_1.ProductControllers.getAllProduct);
router.get('/listings/me', (0, auth_1.default)(user_constant_1.USER_ROLE === null || user_constant_1.USER_ROLE === void 0 ? void 0 : user_constant_1.USER_ROLE.user), product_controller_1.ProductControllers.getMeProducts);
//create get api to handle get request from client
router.get('/listings/:id', product_controller_1.ProductControllers.getSingleProduct);
router.put('/listings/mark-sold/:id', (0, auth_1.default)(user_constant_1.USER_ROLE === null || user_constant_1.USER_ROLE === void 0 ? void 0 : user_constant_1.USER_ROLE.user), product_controller_1.ProductControllers.markAsSold);
//export
exports.productRouter = router;
