


import { NextResponse, NextRequest } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import Product from "@/models/product";
import { v2 as cloudinary } from "cloudinary";
import { Readable } from "stream";

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

export async function POST(request: NextRequest) {
  try {
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
      image: uploadResponse.secure_url, // Use Cloudinary URL for the image field
    });

    await newProduct.save();

    return NextResponse.json({
      message: "Product created successfully",
      success: true,
      product: newProduct,
    });
  } catch (error: any) {
    console.error("Error creating product:", error.message);

    return NextResponse.json(
      { message: "Something went wrong", error: error.message },
      { status: 500 }
    );
  }
}
