import UserModel from "../../../models/user.model.js";
import PublishModel from "../../../models/publish.model.js";
const deletebookmarks = async (req, res) => {
  console.log("vanalakm");
  const { newsid, userid } = req.query;
  if (newsid === undefined || userid === undefined) {
    res.status(400).json({ success: false, desc: "Bad Request" });
    return null;
  }

  const existinguser = await UserModel.findOne({ _id: userid });
  if (!existinguser.bookmarks.includes(newsid)) {
    res.status(406).json({ success: false, desc: "bookmark not found" });
    return null;
  }

  try {
    const data = await UserModel.findOneAndUpdate(
      { _id: userid },
      { $pull: { bookmarks: newsid } }
    );
    res.send({ success: true, desc: "bookmark removed" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, desc: "Something went wrong" });
  }
};
export default deletebookmarks;
