// import nodemailer from "nodemailer";
// import User from "@/models/userModerl";
// import bcryptjs from "bcryptjs";

// export const sendMail = async ({ email, emailType, userId }: any) => {
//   try {
//     //create a hashed token
//     const hashedToken = bcryptjs.hash(userId.toString(), 10);

//     if (emailType === "VERIFY") {
//       await User.findByIdAndUpdate(userId, {
//         verifyToken: hashedToken,
//         verifyTokenExpires: Date.now() + 3600000,
//       });
//     } else if (emailType === "RESET") {
//       await User.findByIdAndUpdate(userId, {
//         forgotPasswordToken: hashedToken,
//         forgotPasswordExpires: Date.now() + 3600000,
//       });
//     }

//     // Looking to send emails in production? Check out our Email API/SMTP product!
//     var transport = nodemailer.createTransport({
//       host: "sandbox.smtp.mailtrap.io",
//       port: 2525,
//       auth: {
//         user: process.env.NODEMAILERUSERNAME,
//         pass:process.env.NODEMAILERPASSWD,
//       },
//     });

//     const mailOptions = {
//         from : "webdeveloperalbasel@gmail.com",
//         to : email,
//         subject : emailType === "VERIFY"? "Verify your email" : "Reset your password",
//         html : `<p>Click <a href="${process.env.DOMAIN}/varifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY"? "verify your email" : "reset your password"} `
//     }
//     const mailResponse = await transport.sendMail(mailOptions);
//     return mailResponse;
//   } catch (error: any) {
//     throw new Error(error.message);
//   }
// };
