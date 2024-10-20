import mongoose from "mongoose";

const Schema = mongoose.Schema;

const orderSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  products: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      productName: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      isRented: {
        type: Boolean,
        required: true,
        default: false,
      },
    },
  ],
  totalAmount: {
    type: Number,
    required: true,
  },
  status: {
    type: Number,
    default: 0,
  },
  returnStatus: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const orders = mongoose.model("Order", orderSchema);

export default orders;
