

import mongoose from "mongoose";
const cartItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true }, // Corrected ref to "Product"
  
});

const ProductSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  brandName: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  sellerId: { type: String, required: true},
  STATUS:{
    type:String,
    required:true,
    enum:["active","inactive","removed"],
    default:"inactive",

},
  // user : [{type : mongoose.Schema.Types.ObjectId, ref: "User"  }]
  cart: [cartItemSchema],
});

const Product =
  mongoose.models.Product || mongoose.model("Product", ProductSchema);

export default Product;