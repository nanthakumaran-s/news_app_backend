import Sandbox from "../../models/sandbox.model.js";
import User from "../../models/user.model.js";

const sandbox = async (req, res) => {
  const { newsid, userid } = req.body;

  // Bad Request
  if (newsid === undefined || userid === undefined) {
    res.json({ success: false, desc: "Bad Request" });
    return null;
  }
  const blockeduser = await User.findOne({ _id: userid });
  if (blockeduser.isblocked) {
    res.json({ success: false, desc: "Blocked User" });
    return null;
  }
  const data = await Sandbox.findOne({ _id: newsid })
    if (
      data.approved.includes(userid) ||
      data.denied.includes(userid) ||
      data.idk.includes(userid)
    ) {
      res.json({ success: false, desc: "User Already Responded" });
      return null;
    }
  
  await User.findOneAndUpdate(
    { _id: userid },
    {
      $inc: {
        score: 0.5
      }
    }
  );
  Sandbox.findOneAndUpdate(
    { _id: newsid },
    { $push: { idk: userid } },
    { new: true }
  )
    .then((data) => {
      res.json({ success: true, desc: "Added to IDK" });
    })
    .catch((err) => {
      console.error(err);
      res.json({ success: false, desc: "Something went wrong" });
    });
};

export default sandbox;
