//model
import User from "../../models/user.model.js";

//dependency
import __dirname from "../../utils/path.js";
import fs from "fs";

const updateprofile = (req, res) => {
  const avatar = req.files;
  const { username, fullname, home_location } = req.body;
  if (avatar) {
    if (fs.existsSync(`${__dirname}/public/uploads/avatars/${username}`)) {
      fs.unlinkSync(`${__dirname}/public/uploads/avatars/${username}`);
    }
    avatar.file.mv(
      `${__dirname}/public/uploads/avatars/${username}.png`,
      (err) => {
        if (err) {
          console.error(err);
        }
      }
    );
  }

  User.findOneAndUpdate(
    { username },
    {
      avatar: `http://localhost:8080/uploads/avatars/${username}.png`,
      fullname: fullname,
      home_location: JSON.parse(home_location),
    },
    {
      new: true,
    }
  )
    .then((user) => {
      return res.json({
        success: true,
        data: user,
      });
    })
    .catch((err) => {
      console.error(err);
      return res.json({
        success: false,
        desc: "Something Went Wrong. Trty Again later.",
      });
    });
};

export default updateprofile;
