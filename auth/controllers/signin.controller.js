//model
import User from "../../models/user.model.js";

//dependency
import bcrypt from "bcrypt";

const signin = (req, res) => {
  const { username, password } = req.query;

  User.findOne({ username }).then((user) => {
    if (!user) {
      return res.json({
        success: false,
        data: null,
        desc: "no user found",
      });
    }
    if (user.isDeleted) {
      return res.json({
        success: false,
        data: null,
        desc: "no user found",
      });
    }
    bcrypt
      .compare(password, user.password)
      .then((isMatch) => {
        if (isMatch) {
          return res.json({
            success: true,
            data: {
              username: user.username,
              email: user.email,
              fullname: user.fullname,
              current_location: user.current_location,
              home_location: user.home_location,
              avatar: user.avatar,
              score: user.score,
            },
          });
        }
        return res.json({
          success: false,
          data: null,
          desc: "invalid password",
        });
      })
      .catch((err) => {
        console.log(err);
        return res.json({
          success: false,
          desc: "Something happed wrong. Try again Later",
        });
      });
  });
};

export default signin;
