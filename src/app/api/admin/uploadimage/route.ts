// // pages/api/uploadImage.ts
// import { NextApiRequest, NextApiResponse } from "next";
// ;
// import multer from "multer";
// import nextConnect from "next-connect";
// import { v2 as cloudinary } from 'cloudinary';
// import { Readable } from "stream";


// // Cloudinary configuration
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// // Set up multer to store the image in memory (not in the file system)
// const upload = multer({ storage: multer.memoryStorage() });

// const handler = nextConnect();

// handler.use(upload.single("image")); // Expect a single file with the name 'image'

// handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ message: "No file uploaded" });
//     }

//     // Upload image to Cloudinary
//     const result = await cloudinary.v2.uploader.upload_stream(
//       { resource_type: "auto" }, // Automatically detect the file type (image, video, etc.)
//       async (error, result) => {
//         if (error) {
//           return res.status(500).json({ message: "Upload to Cloudinary failed", error });
//         }

//         // Respond with the image URL
//         return res.status(200).json({ url: result?.secure_url });
//       }
//     );

//     // Pipe the buffer data of the file to Cloudinary's upload stream
//     const bufferStream = new Readable();
//     bufferStream.push(req.file.buffer);
//     bufferStream.push(null);
//     bufferStream.pipe(result);
//   } catch (error) {
//     console.error("Error uploading image:", error);
//     res.status(500).json({ message: "Failed to upload image" });
//   }
// });

// export default handler;
import { NextApiRequest, NextApiResponse } from "next";
import multer from "multer";
import nextConnect from "next-connect";
import { v2 as cloudinary } from "cloudinary";
import { Readable } from "stream";

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Set up multer to store the image in memory (not in the file system)
const upload = multer({ storage: multer.memoryStorage() });

// Define the types for Cloudinary response
import { UploadApiResponse, UploadApiErrorResponse } from "cloudinary";

// Set up next-connect handler
const handler = nextConnect();

handler.use(upload.single("image")); // Expect a single file with the name 'image'

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Upload image to Cloudinary
    const uploadStream = cloudinary.uploader.upload_stream(
      { resource_type: "auto" }, // Automatically detect the file type (image, video, etc.)
      (error: UploadApiErrorResponse | undefined, result: UploadApiResponse | undefined) => {
        if (error) {
          return res.status(500).json({ message: "Upload to Cloudinary failed", error });
        }

        if (result) {
          // Respond with the image URL
          return res.status(200).json({ url: result.secure_url });
        }
      }
    );

    // Pipe the buffer data of the file to Cloudinary's upload stream
    const bufferStream = new Readable();
    bufferStream.push(req.file.buffer);
    bufferStream.push(null);
    bufferStream.pipe(uploadStream);
  } catch (error) {
    console.error("Error uploading image:", error);
    res.status(500).json({ message: "Failed to upload image" });
  }
});

export default handler;
