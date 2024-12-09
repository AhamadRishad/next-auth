
'use client'

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

interface Product {
  _id: string;
  productName: string;
  brandName: string;
  price: number;
  description: string;
  image: string; // Updated to be an array
}

export default function Dashboard() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("/api/admin/displayproduct"); // Adjust URL if needed
        setProducts(response.data.products); // Ensure the response is set correctly
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const truncateText = (text: string, limit: number = 30) => {
    return text.length > limit ? text.substring(0, limit) + "..." : text;
  };

  const truncateText2 = (text: string, limit: number = 25) => {
    return text.length > limit ? text.substring(0, limit) + "..." : text;
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 ">
      <div className="max-w-7xl mx-auto ">
        <div className="flex justify-between p-2">
          <div>

          </div>
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Our Products</h1>
        <div>
        <Link href={"/admin/addproducts"}> <button className="bg-green-500 p-3 rounded text-white hover:bg-green-700">  Add Products</button></Link>
        <Link href={"/admin/myproducts"}> <button className="bg-green-500 p-3 rounded text-white hover:bg-green-700">  My Products</button></Link>
        </div>
       
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product._id} className="bg-white rounded-lg shadow-lg overflow-hidden group hover:shadow-2xl transition-shadow duration-300">
              {/* Display the first image from the array */}
              <img
                src={product.image}  // Updated to display the first image in the array
                alt={product.productName}
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-900 ">{truncateText2(product.description)}</h2>
                <p className="text-sm text-gray-600 ">{product.brandName}</p>
                <p className="text-lg font-bold text-gray-900 ">${product.price}</p>
                <p className="text-sm text-gray-500 ">{truncateText(product.description)}</p>
                <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
