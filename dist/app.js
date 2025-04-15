"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const globalError_1 = __importDefault(require("./app/middlewires/globalError"));
const notFound_1 = __importDefault(require("./app/middlewires/notFound"));
const admin_route_1 = require("./app/modules/admin/admin.route");
const auth_route_1 = require("./app/modules/auth/auth.route");
const messages_router_1 = require("./app/modules/messages/messages.router");
const order_routes_1 = require("./app/modules/order/order.routes");
const product_routes_1 = require("./app/modules/product/product.routes");
const wishlist_routes_1 = require("./app/modules/wishlist/wishlist.routes");
const app = (0, express_1.default)();
//parsers
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: 'https://seccond-hand-client.vercel.app',
    credentials: true,
}));
app.use((0, cookie_parser_1.default)());
//application routes
app.use('/api', auth_route_1.AuthRoutes);
app.use('/api', product_routes_1.productRouter);
app.use('/api', order_routes_1.orderRouter);
app.use('/api', admin_route_1.AdminRouter);
app.use('/api', wishlist_routes_1.WishListRouter);
app.use('/api', messages_router_1.messageRouter);
//check application running or not
app.get('/', (req, res) => {
    res.json({
        messsage: 'server running!',
        success: true,
        data: {},
    });
});
//global error handler
app.use(globalError_1.default);
//Not Found
app.use(notFound_1.default);
//export
exports.default = app;
