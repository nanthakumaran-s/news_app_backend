import { client } from "../middleware/redis.js";
import User from "../../models/user.model.js";
import bcrypt from "bcrypt";

const verifyToken = async (req, res) => {
  const { email, token, newPassword } = req.body;
  if (
    email == undefined ||
    (email == null && token == undefined) ||
    (token == null && newPassword == undefined)
  ) {
    return res.json({
      success: false,
      desc: "invalid credential",
    });
  }

  client.get(email, async (err, generated_token) => {
    if (err) {
      return res.json({
        success: false,
        desc: "token invalid",
      });
    }
    if (token === generated_token) {
      await bcrypt
        .genSalt(12)
        .then(async (salt) => {
          await bcrypt
            .hash(newPassword, salt)
            .then((hash) => {
              User.findOneAndUpdate(
                { email: email },
                {
                  password: hash,
                }
              )
                .then(() => {
                  return res.json({
                    success: true,
                    is_password_changed: true,
                  });
                })
                .catch((err) => {
                  return res.json({
                    success: false,
                    desc: "Something Went Wrong",
                  });
                });
            })
            .catch((err) => {
              console.error(err);
              return res.json({
                success: false,
                desc: "Something happed wrong. Try again Later",
              });
            });
        })
        .catch((err) => {
          console.error(err);
          return res.json({
            success: false,
            isUserExsisted: null,
            desc: "Something happed wrong. Try again Later",
          });
        });
      client.del(email);
    } else {
      return res.json({
        success: false,
        desc: "token invalid",
      });
    }
  });
};

export default verifyToken;
