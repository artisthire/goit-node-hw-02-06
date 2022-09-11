const nodemailer = require("nodemailer");

const sendMail = async (receiver, text) => {
  const { EMAIL_USER, EMAIL_PASSWORD } = process.env;

  const transporter = nodemailer.createTransport({
    host: "smtp.meta.ua",
    port: 465,
    secure: true,
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASSWORD,
    },
  });

  await transporter.sendMail({
    from: EMAIL_USER,
    to: receiver,
    subject: "Email confirmation",
    html: text,
  });
};

module.exports = sendMail;
