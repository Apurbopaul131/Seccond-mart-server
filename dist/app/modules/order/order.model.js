"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const order_constants_1 = require("./order.constants");
//order schema
const OrderSchema = new mongoose_1.default.Schema({
    buyerID: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: [true, 'buyerId is required'],
        ref: 'User',
        trim: true,
    },
    sellerID: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: [true, 'sellerID is required'],
        ref: 'User',
        trim: true,
    },
    itemID: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: [true, 'sellerID is required'],
        ref: 'Listing',
        trim: true,
    },
    status: {
        type: String,
        enum: {
            values: order_constants_1.orderStatus,
            message: '{VALUE} is not supported',
        },
        default: 'pending',
    },
    transaction: {
        id: String,
        transactionStatus: String,
        bank_status: String,
        sp_code: String,
        sp_message: String,
        method: String,
        date_time: String,
        payment_status: String,
    },
}, {
    timestamps: true,
});
// Create and export the model
const OrderModel = mongoose_1.default.model('Order', OrderSchema);
//export
exports.default = OrderModel;
