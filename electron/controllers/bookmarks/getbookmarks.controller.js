import UserModel from "../../../models/user.model.js";
import PublishModel from "../../../models/publish.model.js";
import path from "../../../utils/path.js";
const getbookmarks = async (req, res) => {
  const { userid } = req.query;

  try {
    const data = await UserModel.findOne({ _id: userid }).populate({
      path: "bookmarks",
      select: "title thumbnail timestamp category",
      populate: { path: "author", select: "username" },
    });
    res.send({ success: true, data: data.bookmarks });
  } catch (error) {
    console.log(error);
    res.json({ success: false, desc: "something went wrong" });
  }
};
export default getbookmarks;
