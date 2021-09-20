import PublishModel from "../../models/publish.model.js";

const getNewsByCategory = async (req, res) => {
  const { category } = req.query;
  if (category === undefined) {
    res.status(400).json({ success: false, desc: "Bad Request" });
  }
  try {
    let data;
    if (category === "") {
       data = await PublishModel.find().populate(
         "author",
         "username"
       );
    } else {
      data = await PublishModel.find({ category }).populate(
        "author",
        "username"
      );
    }
    res.json({ success: true, data });
  } catch (error) {
    console.log(error);
    res.json({ success: false, desc: "something went wrong" });
  }
};
export default getNewsByCategory;
