import UserModel from "../../models/user.model.js";
import Published from "../../models/publish.model.js";
const block = async (req, res) => {
  const { username } = req.body;
  if (username === undefined) {
    res.json({ success: false, desc: "bad request" });
  }
 const data = await UserModel.findOne({ username });
 if (data.isblocked) {
   return res.json({
     success: false,
     desc: "already blocked"
   });
 }
  UserModel.findOneAndUpdate(
    { username },
    {
      isblocked: true
    },
    { new: true }
  )
    .then((data) => {
      Published.findOneAndUpdate(
        { author: data._id },
        {
          isblock: true
        },
        { new: true }
      )
        .then((data) => {
          return res.json({
            success: true,
            desc: "blocked successfully"
          });
        })
        .catch((err) => {
          console.log(err);
          return res.json({
            success: false,
            dec: "Something Went Wrong. Try Again"
          });
        });
    })
    ;
};
export default block;
