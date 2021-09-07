import PublishModel from "../../models/publish.model.js";
import Sandbox from "../../models/sandbox.model.js";

const approve = (req, res) => {
  const { newsid, userid } = req.query;

  // Bad Request
  if (newsid === undefined || userid === undefined) {
    res.status(400).json({ success: false, desc: "Bad Request" });
    return null;
  }

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

  Sandbox.findOneAndUpdate(
    { _id: newsid },
    { $push: { approved: userid } },
    { new: true }
  )
    .then((data) => {
      //TODO: Check if percentage reached and move to published

      res.status(200).json({ success: true, desc: "Added to Approved" });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ success: false, desc: "Something went wrong" });
    });
};

export default approve;
