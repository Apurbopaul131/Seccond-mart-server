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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListingModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const product_constant_1 = require("./product.constant");
//Stationary product schema
const StationeryProductSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: [true, 'name is required'],
        trim: true, // Removes extra spaces
    },
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'UserId is requierd'],
    },
    condition: {
        type: String,
        required: [true, 'codition is required'],
        enum: {
            values: product_constant_1.productCondition,
            message: '{VALUE} is not supported.',
        },
    },
    brand: {
        type: String,
        required: [true, 'brand is required'],
        trim: true,
    },
    price: {
        type: Number,
        required: [true, 'price is required'],
        min: [0, 'Price must be a positive number'],
    },
    category: {
        type: String,
        required: [true, 'category is required'],
        enum: {
            values: product_constant_1.productCategories,
            message: '{VALUE} is not supported.',
        },
    },
    images: {
        type: [String],
        trim: true,
    },
    description: {
        type: String,
        required: [true, 'description is required'],
        trim: true,
    },
    status: {
        type: String,
        required: [true, 'Status is required'],
        enum: {
            values: product_constant_1.productStatus,
            message: '{VALUE} is not supported.',
        },
        default: 'available',
    },
    location: {
        type: String,
        required: [true, 'lcoation is required'],
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true, // Adds createdAt and updatedAt fields automatically
});
//Custom statics method that is used for check product is exist or not
StationeryProductSchema.statics.findProductById = function (productId) {
    return __awaiter(this, void 0, void 0, function* () {
        const existingProduct = yield exports.ListingModel.findById(productId);
        return existingProduct;
    });
};
//create model and export
exports.ListingModel = mongoose_1.default.model('Listing', StationeryProductSchema);
