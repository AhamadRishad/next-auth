
import { connect } from "@/dbConfig/dbConfig";  // Adjust the path as needed
import Product from "@/models/product";

export async function GET() {
  try {
    await connect();  // Ensure the DB connection is established first
    const products = await Product.find();
    return new Response(
      JSON.stringify({ success: true, products }),
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error fetching products:", error);
    return new Response(
      JSON.stringify({ message: "Something went wrong", error: error.message }),
      { status: 500 }
    );
  }
}
