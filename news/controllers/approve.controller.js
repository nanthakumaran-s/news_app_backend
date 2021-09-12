import PublishModel from "../../models/publish.model.js";
import Sandbox from "../../models/sandbox.model.js";
const approve = async (req, res) => {
  const { newsid, userid } = req.query;
  // Bad Request
  if (newsid === undefined || userid === undefined) {
    res.json({ success: false, desc: "Bad Request" });
    return null;
  }

  const datas = await Sandbox.findOne({ _id: newsid });
  if (
    datas.approved.includes(userid) ||
    datas.denied.includes(userid) ||
    datas.idk.includes(userid)
  ) {
    res.json({ success: false, desc: "User Already Responded" });
    return null;
  }

  const data = await Sandbox.findOneAndUpdate(
    { _id: newsid },
    { $push: { approved: userid } },
    { new: true }
  );

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
  try {
    if (approvepercent >= 20) {
      await publishPost.save();
      res.json({ success: true, desc: "Added to Approved" });
    }else{
      res.json({ success: false, desc: "Denied" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, desc: "Something went wrong" });
  }
};

export default approve;
