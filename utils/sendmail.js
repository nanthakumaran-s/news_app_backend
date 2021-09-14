import nodemailer from "nodemailer";
import { google } from "googleapis";

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

const REDIRECT_URL = "https://developers.google.com/oauthplayground/";

const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URL
);

oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const sendMail = async (name, email, token) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "primostepz@gmail.com",
      pass: "alphaprogrammerz",
    },
  });

  const mailOption = {
    from: "primostepz@gmail.com",
    to: email,
    subject: `Reset Password Request`,
    text: `Hai ${name} ${token}`,
  };

  await transporter
    .sendMail(mailOption)
    .then((s) => {
      console.log(s);
      return "success";
    })
    .catch((err) => {
      console.error(err);
      return "err";
    });
};

export default sendMail;
