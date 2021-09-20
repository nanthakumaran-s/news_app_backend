import UserModel from "../../models/user.model.js";
import Published from "../../models/publish.model.js";
const unblock = async (req, res) => {
  const { username } = req.body;
  if (username === undefined) {
    res.json({ success: false, desc: "bad request" });
  }
  const data = await UserModel.findOne({ username });
  if (!(data.isblocked)) {
    return res.json({
      success: false,
      desc: "already unblocked"
    });
  }
  UserModel.findOneAndUpdate(
    { username },
    {
      isblocked: false
    },
    { new: true }
  ).then((data) => {
    Published.findOneAndUpdate(
      { author: data._id },
      {
        isblock: false
      },
      { new: true }
    )
      .then((data) => {
        return res.json({
          success: true,
          desc: "unblocked successfully"
        });
      })
      .catch((err) => {
        console.log(err);
        return res.json({
          success: false,
          dec: "Something Went Wrong. Try Again"
        });
      });
  });
};
export default unblock;
