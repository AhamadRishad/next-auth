

import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  brandName: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  STATUS:{
    type:String,
    required:true,
    enum:["active","inactive","removed"],
    default:"inactive",

},
  user : [{type : mongoose.Schema.Types.ObjectId, ref: "User"  }]
});

const Product =
  mongoose.models.Product || mongoose.model("Product", ProductSchema);

export default Product;