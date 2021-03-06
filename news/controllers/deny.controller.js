import Sandbox from "../../models/sandbox.model.js";
import User from "../../models/user.model.js";

const deny = (req, res) => {
  const { newsid, userid } = req.body;

  // Bad Request
  if (newsid === undefined || userid === undefined) {
    res.status(400).json({ success: false, desc: "Bad Request" });
    return null;
  }
  const blockeduser = User.findOne({ _id: userid }).then((data) => {
    if (data.isblocked) {
      res.json({ success: false, desc: "Blocked User" });
      return null;
    }
  });

  Sandbox.findOne({ _id: newsid }).then((data) => {
    if (
      data.approved.includes(userid) ||
      data.denied.includes(userid) ||
      data.idk.includes(userid)
    ) {
      res.status(406).json({ success: false, desc: "User Already Responded" });
      return null;
    }
  });

  User.findOneAndUpdate(
    { _id: userid },
    {
      $inc: {
        score: 2.5
      }
    }
  );

  Sandbox.findOneAndUpdate(
    { _id: newsid },
    { $push: { denied: userid } },
    { new: true }
  )
    .then((data) => {
      res.status(200).json({ success: true, desc: "Added to Denied" });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ success: false, desc: "Something went wrong" });
    });
};

export default deny;
