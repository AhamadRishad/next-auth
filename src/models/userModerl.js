import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: "cart", required: true },
    quantity: { type: Number, default: 1 }
  });

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true, "Username is required"],
        unique:true
    },
    email:{
        type:String,
        required:[true, "Email is required"],
        unique:true
    },
    password:{
        type:String,
        required:[true, "Password is required"],
        
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    cart: [cartItemSchema],
    
    forgotPasswordToken:String,
    forgotPasswordExpires:Date,
    verifyToken:String,
    verifyExpires:Date,
})

const User = mongoose.model.users || mongoose.model("users",userSchema);

export default User;