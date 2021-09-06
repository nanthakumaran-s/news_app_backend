//model
import User from "../../models/user.model.js";

//dependency
import bcrypt from "bcrypt";
import { client } from "../middleware/redis.js";

const deleteuser = (req, res) => {
  const { username, password } = req.query;

  User.findOne({ username }).then((user) => {
    if (!user) {
      return res.json({
        success: false,
        data: null,
        desc: "no user found",
      });
    }

    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        User.findOneAndUpdate(
          { username },
          {
            username: `user_${Math.floor(Math.random() * 900000) + 100000}`,
            password: "",
            email: `user_${Math.floor(Math.random() * 900000) + 100000}`,
            fullname: `user_${Math.floor(Math.random() * 900000) + 100000}`,
            isDeleted: true,
          },
          {
            new: true,
          }
        )
          .then(async (doc) => {
            await client.lrem("usernames", 0, username);
            return res.json({
              success: true,
              data: doc,
            });
          })
          .catch((err) => {
            console.error(err);
            return res.json({
              success: false,
              data: null,
              desc: "something went wrong",
            });
          });
      } else {
        return res.json({
          success: false,
          data: null,
          desc: "incorrect password",
        });
      }
    });
  });
};

export default deleteuser;
