"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRouter = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewires/auth"));
const validateRequest_1 = __importDefault(require("../../middlewires/validateRequest"));
const user_constant_1 = require("../user/user.constant");
const product_controller_1 = require("./product.controller");
const product_validation_1 = require("./product.validation");
//create router object
const router = express_1.default.Router();
//create post api to handle post requsest from client
router.post('/listings', (0, auth_1.default)(user_constant_1.USER_ROLE === null || user_constant_1.USER_ROLE === void 0 ? void 0 : user_constant_1.USER_ROLE.user), (0, validateRequest_1.default)(product_validation_1.ProductValidatios.createProductValidationSchema), product_controller_1.ProductControllers.createProduct);
//create delete api to handle delete request from client
router.delete('/listings/:id', (0, auth_1.default)(user_constant_1.USER_ROLE === null || user_constant_1.USER_ROLE === void 0 ? void 0 : user_constant_1.USER_ROLE.user), product_controller_1.ProductControllers.deleteSingleProduct);
//create update api to handle delete request from client
router.put('/listings/:id', (0, auth_1.default)(user_constant_1.USER_ROLE === null || user_constant_1.USER_ROLE === void 0 ? void 0 : user_constant_1.USER_ROLE.user), (0, validateRequest_1.default)(product_validation_1.ProductValidatios.updateProductValidationSchema), product_controller_1.ProductControllers.updateSingleProduct);
//create get api to handle get request from client
router.get('/listings', product_controller_1.ProductControllers.getAllProduct);
router.get('/listings/me', (0, auth_1.default)(user_constant_1.USER_ROLE === null || user_constant_1.USER_ROLE === void 0 ? void 0 : user_constant_1.USER_ROLE.user), product_controller_1.ProductControllers.getMeProducts);
//create get api to handle get request from client
router.get('/listings/:id', product_controller_1.ProductControllers.getSingleProduct);
router.put('/listings/mark-sold/:id', (0, auth_1.default)(user_constant_1.USER_ROLE === null || user_constant_1.USER_ROLE === void 0 ? void 0 : user_constant_1.USER_ROLE.user), product_controller_1.ProductControllers.markAsSold);
//export
exports.productRouter = router;
