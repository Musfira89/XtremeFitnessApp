import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendEmail = async ({ to, subject, text, html }) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      text, // This is optional
      html, // Ensure HTML is supported
    });

    console.log(`✅ Email sent: ${info.messageId}`);
  } catch (error) {
    console.error("❌ Email sending failed:", error.message, error.response);
  }
};



export default sendEmail;
