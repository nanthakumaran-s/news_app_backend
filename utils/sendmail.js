import nodemailer from "nodemailer";



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
