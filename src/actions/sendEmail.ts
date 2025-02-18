// "use server";
// import nodemailer from "nodemailer";

// const transporter = nodemailer.createTransport(
//   {
//     host: "ssl0.ovh.net",
//     port: 465,
//     secure: true,

//     auth: {
//       user: process.env.EMAIL_USER,
//       pass: process.env.EMAIL_PASS,
//     },
//   },
//   {
//     // debug: true, // Enable debugging
//     // logger: true // Enable logging
//   }
// );

// export const sendEmail = async ({ text, sujet, email }) => {
//   try {
//     await transporter.verify();
//   } catch (error) {
//     throw new Error(`Error sending email: ${error.message}`);
//   }
//   const mailOptions = {
//     from: email,
//     to: process.env.NEXT_PUBLIC_EMAIL_TO,
//     subject: sujet,
//     text: text,
//   };
//   try {
//     const info = await transporter.sendMail(mailOptions);
//     if (info.messageId) {
//       return { success: true, message: info.response };
//     } else {
//       throw new Error("Une erreur s'est produite lors de l'envoi du message.");
//     }
//   } catch (error) {
//     return { success: false, message: error.message };
//   }
// };
