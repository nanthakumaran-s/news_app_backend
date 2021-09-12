import UserModel from "../../../models/user.model.js";
import PublishModel from "../../../models/publish.model.js";
const createbookmarks = async (req, res) => {
  const { newsid, userid } = req.body;
  if (newsid === undefined || userid === undefined) {
    res.status(400).json({ success: false, desc: "Bad Request" });
    return null;
  }

  const existinguser = await UserModel.findOne({ _id: userid });
  if (existinguser.bookmarks.includes(newsid)) {
    res.status(406).json({ success: false, desc: "Already saved" });
    return null;
  }

  try {
    const data = await UserModel.findOneAndUpdate(
      { _id: userid },
      { $push: { bookmarks: newsid } }
    );
    res.send({ success: true, desc: "book mark added" });
  } catch (error) {
    console.error(err);
    res.status(500).json({ success: false, desc: "Something went wrong" });
  }
};
export default createbookmarks;
