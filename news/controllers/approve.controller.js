import PublishModel from "../../models/publish.model.js";
import Sandbox from "../../models/sandbox.model.js";
const approve = async (req, res) => {
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
      const approvedPost = {
        title: data.title,
        content: data.content,
        thumbnail: data.thumbnail,
        author: data.author,
        approved: data.approved,
        timestamp: data.timestamp,
        location: data.location,
        denied: data.denied,
        category: data.category
      };
      const publishPost = new PublishModel(approvedPost);
      const approvepercent = (data.approved.length / data.sendcount) * 100;
      if (approvepercent >= 20) {
        PublishModel(publishPost)
          .save()
          .then((doc) =>
            res.status(200).json({ success: true, desc: "Added to Approved" })
          );
        return null;
      } else {
        res.status(400).json({ success: false, desc: "Denied" });
      }
    })
    .catch((err) => {
      throw err;
    });
};

export default approve;
