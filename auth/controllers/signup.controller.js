//model
import User from "../../models/user.model.js";

//dependencies
import bcrypt from "bcrypt";
import { client } from "../middleware/redis.js";

const signup = async (req, res) => {
  const {
    username,
    email,
    fullname,
    password,
    deviceid,
    home_location,
    platform,
  } = req.body;

  const newUser = User({
    username,
    email,
    fullname,
    deviceid,
    home_location,
    platform,
    score: 0,
  });

  await bcrypt
    .genSalt(12)
    .then(async (salt) => {
      await bcrypt.hash(password, salt).then((hash) => {
        newUser.password = hash;
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

  newUser
    .save()
    .then(async (user) => {
      await client.lpush("usernames", user.username);
      return res.json({
        success: true,
        data: user,
      });
    })
    .catch((err) => {
      if (err.code === 11000) {
        return res.json({
          success: false,
          isUserExsisted: true,
          desc: "Username Already Exsited. Try Other names",
        });
      } else {
        console.error(err);
        return res.json({
          success: false,
          isUserExsisted: false,
          desc: "Something Went Wrong. Try After Few Minutes",
        });
      }
    });
};

export default signup;
