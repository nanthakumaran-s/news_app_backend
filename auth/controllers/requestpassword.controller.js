import generate from "shortid";
import sendMail from "../../utils/sendmail.js";
import User from "../../models/user.model.js";
import { client } from "../middleware/redis.js";

const requestreset = async (req, res) => {
  const { email } = req.query;
  if (email == undefined) {
    return res.json({
      success: false,
      desc: "invalid credential",
    });
  }

  User.findOne({ email: email }).then(async (user) => {
    if (!user) {
      return res.json({
        success: "false",
        desc: "user not found",
      });
    }
    const user_mail = user.email;
    const name = user.fullname;
    const UUID = generate.generate();
    client.setex(user_mail, 900, UUID);
    await sendMail(name, user_mail, UUID);
    res.json({
      success: true,
      desc: "mail send",
      otp: UUID,
    });
  });
};

export default requestreset;
