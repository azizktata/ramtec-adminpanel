"use server";

import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  // host: "ssl0.ovh.net",
  // port: 465,
  // secure: true,
  service: "gmail",
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendEmail = async ({
  text,
  sujet,
  email = process.env.EMAIL_USER,
}: {
  text: string;
  sujet: string;
  email?: string;
}) => {
  try {
    await transporter.verify();
  } catch (error) {
    throw new Error(`Error sending email: ${(error as Error).message}`);
  }
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: sujet,
    text: text,
  };
  try {
    const info = await transporter.sendMail(mailOptions);
    if (info.messageId) {
      return { success: true, message: info.response };
    } else {
      throw new Error("Une erreur s'est produite lors de l'envoi du message.");
    }
  } catch (error) {
    return { success: false, message: (error as Error).message };
  }
};
