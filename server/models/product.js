import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    description: {
        type: String,
        trim: true
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    stock: {
        type: Number,
        required: true,
        min: 0
    },
    imageUrl: 
    {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    rentPrice: {
        type: Number,
        required: true,
        min: 0
    },
});

const Product = mongoose.model('Product', productSchema);

export default Product;