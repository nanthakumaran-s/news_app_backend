import Category from "../../../models/category.model.js";
const createCategory = async (req, res) => {
  const { title, color, bgcolor } = req.body;
  let imgUrl = `https://images.unsplash.com/photo-1588681664899-f142ff2dc9b1?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80`;
  if (title === undefined || color === undefined || bgcolor === undefined) {
    res.status(400).json({ success: false, desc: "Bad request" });
  }
  const addCategory = {
    title,
    color,
    bgcolor,
    imageUrl: imgUrl
  };
  const newCategory = new Category(addCategory);
  try {
    await newCategory
      .save()
      .then((doc) => {
        res.status(200).json({
          success: true,
          data: doc,
          desc: "Added successfully"
        });
      })
      .catch((error) => console.log(error));
  } catch (error) {
    console.log(error);
    res.status(404).json({ success: false, desc: "Something went wrong" });
  }
};

export default createCategory;
