


"use client";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

interface FormDataType {
  productName: string;
  brandName: string;
  price: string;
  description: string;
  image: File | null;
}

export default function AddProducts() {
  const [image, setImage] = useState<File | null>(null);
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FormDataType>();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
      setValue("image", e.target.files[0]); // Set image in the form state
    }
  };

  const onSubmit: SubmitHandler<FormDataType> = async (formData) => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("productName", formData.productName);
      formDataToSend.append("brandName", formData.brandName);
      formDataToSend.append("price", formData.price);
      formDataToSend.append("description", formData.description);

      if (image) {
        formDataToSend.append("image", image);
      }


      const response = await axios.post("/api/admin/addproducts", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data", // Ensure correct headers for file upload
        },
      
      });
      reset() ;

      alert("Product added successfully!");
      console.log(response.data);
    } catch (error: any) {
      console.error("Error adding product:", error);
      alert(error.response?.data?.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg w-full bg-white p-8 shadow-md rounded-lg">
       
        <div className="flex items-end justify-end   ">
        <Link href={"/admin/dashbord"}> <h1 className="hover:font-extrabold hover:text-red-600 cursor-pointer text-2xl	hover:border p-3 rounded border-red-900"> X</h1></Link>
        </div>
        
        <h2 className="text-center text-2xl font-bold text-gray-800 mb-6">
          Add a New Product
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Product Name */}
          <div className="mb-4">
            <label htmlFor="productName" className="block text-sm font-medium text-gray-700 mb-1">
              Product Name
            </label>
            <input
              type="text"
              id="productName"
              {...register("productName", { required: "Product name is required" })}
              placeholder="Enter product name"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm"
            />
            {errors.productName && <p className="text-red-500 text-sm">{errors.productName.message}</p>}
          </div>

          {/* Brand Name */}
          <div className="mb-4">
            <label htmlFor="brandName" className="block text-sm font-medium text-gray-700 mb-1">
              Brand Name
            </label>
            <input
              type="text"
              id="brandName"
              {...register("brandName", { required: "Brand name is required" })}
              placeholder="Enter brand name"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm"
            />
            {errors.brandName && <p className="text-red-500 text-sm">{errors.brandName.message}</p>}
          </div>

          {/* Price */}
          <div className="mb-4">
            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
              Price
            </label>
            <input
              type="number"
              id="price"
              {...register("price", { required: "Price is required" })}
              placeholder="Enter product price"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm"
            />
            {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
          </div>

          {/* Description */}
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              id="description"
              {...register("description", { required: "Description is required" })}
              placeholder="Enter product description"
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm"
            ></textarea>
            {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
          </div>

          {/* Image Upload */}
          <div className="mb-4">
            <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
              Product Image
            </label>
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full text-gray-700 px-3 py-2 border border-gray-300 rounded-lg shadow-sm"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-700"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
}
