


import { NextResponse, NextRequest } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import Product from "@/models/product";
import { v2 as cloudinary } from "cloudinary";
import { Readable } from "stream";
import jwt from "jsonwebtoken";
import User from "@/models/userModerl";

// Connect to MongoDB
connect();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Helper to convert ReadableStream to Buffer
async function streamToBuffer(readableStream: ReadableStream): Promise<Buffer> {
  const reader = readableStream.getReader();
  const chunks: Uint8Array[] = [];
  let done = false;

  while (!done) {
    const { value, done: readerDone } = await reader.read();
    if (value) chunks.push(value);
    done = readerDone;
  }
  return Buffer.concat(chunks);
}

 
// Upload file to Cloudinary
const uploadToCloudinary = (buffer: Buffer, folder: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );
    Readable.from(buffer).pipe(uploadStream); // Pipe the buffer to Cloudinary
  });
};
type DecodedToken = {
  id: string;
  username: string;
  email: string;
  iat: number;
  exp: number;
};

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get("token");
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    } 

    let decodedToken:DecodedToken
    try {
      decodedToken = jwt.verify(token.value, process.env.TOKEN_SECRET_KEY!) as DecodedToken;
    } catch (error) {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }

    console.log("decodedToken  = " ,decodedToken);

    const {email} = decodedToken;
    if(!email){
      console.error("Email not found in token");
      return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }
    await connect();
    const findUserByEmail = await User.findOne({ email });
    if(!findUserByEmail) {
      console.error("User not found in database");
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    console.log('findUserByEmail  = ', findUserByEmail);
    const ProductRelation = findUserByEmail.cart;
    console.log('ProductRelation  = ', ProductRelation);



    const formData = await request.formData();
    const productName = formData.get("productName") as string;
    const brandName = formData.get("brandName") as string;
    const price = formData.get("price") as string;
    const description = formData.get("description") as string;
    const image = formData.get("image") as File;

    // Validate required fields
    if (!productName || !brandName || !price || !description || !image) {
      return NextResponse.json(
        { message: "All fields, including an image, are required" },
        { status: 400 }
      );
    }

    // Convert image to buffer
    const buffer = await streamToBuffer(image.stream());

    // Upload image to Cloudinary
    const uploadResponse = await uploadToCloudinary(buffer, "products");

    // Save the product to the database
    const newProduct = new Product({
      productName,
      brandName,
      price: parseFloat(price), // Ensure numeric value for price
      description,
      sellerId: findUserByEmail._id, // Use the user's ID for the seller field
      image: uploadResponse.secure_url, // Use Cloudinary URL for the image field
    });

    const newCreatedProduct = await newProduct.save();

    ProductRelation.push({product:newCreatedProduct._id});
    await findUserByEmail.save();
    console.log('findUserByEmail after adding product = ', findUserByEmail);

    

   
    return NextResponse.json({
      message: "Product created successfully",
      success: true,
      product: newCreatedProduct,
    });
  } catch (error: any) {
    console.error("Error creating product:", error.message);

    return NextResponse.json(
      { message: "Something went wrong", error: error.message },
      { status: 500 }
    );
  }
}
