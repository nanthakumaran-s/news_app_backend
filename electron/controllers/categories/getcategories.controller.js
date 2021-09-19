import Category from "../../../models/category.model.js";
const getCategory = async (req, res) => {
  try {
    const data = await Category.find();
    res.send({ success: true, data});
  } catch (error) {
    console.log(error);
    res.json({ success: false, desc: "something went wrong" });
  }
};
export default getCategory;
