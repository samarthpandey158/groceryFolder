// import nodemailer from "nodemailer";

// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.EMAIL,
//     pass: process.env.PASS,
//   },
// });

// export const sendMail = async (to: string, subject: string, html: string) => {
//   const info=await transporter.sendMail({//
//     from: `"ShopNest" <${process.env.EMAIL}>`,
//     to,
//     subject,
//     html,
//   });
//   console.log("Email accepted:", info.accepted);//
//   console.log("Email rejected:", info.rejected);//
//   console.log("Message ID:", info.messageId);//
//   return info;//
// };
// // Change hua hai
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // Port 465 ke liye true
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS, // Note: Yeh 16-character ka App Password hona chahiye
  },
});

export const sendMail = async (to: string, subject: string, html: string) => {
  try {
    const info = await transporter.sendMail({
      from: `"ShopNest" <${process.env.EMAIL}>`,
      to,
      subject,
      html,
    });

    console.log("Email accepted:", info.accepted);
    console.log("Email rejected:", info.rejected);
    console.log("Message ID:", info.messageId);

    return info;
  } catch (error) {
    console.error("Error sending mail:", error);
    throw error; // Throw karein taaki API route ke catch block mein capture ho sake
  }
};