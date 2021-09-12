import UserModel from "../../../models/user.model.js";
import PublishModel from "../../../models/publish.model.js";
const getbookmarks = async (req, res) => {
  const { userid } = req.body;

  try {
    const data = await UserModel.findOne({ _id: userid }).populate("bookmarks");
    res.send({ success: true, data:data.bookmarks });
  } catch (error) {
    console.log(error);
    res.json({ success: false, desc: "something went wrong" });
  }
};
export default getbookmarks;
