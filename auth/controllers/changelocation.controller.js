//model
import User from "../../models/user.model.js";

const changelocation = (req, res) => {
  const { username, current_location } = req.body;

  User.findOneAndUpdate(
    { username },
    {
      current_location,
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
        desc: "Something Went Wrong. Try Again Later",
      });
    });
};

export default changelocation;
