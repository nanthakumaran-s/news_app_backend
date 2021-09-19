import Category from "../../../models/category.model.js";
const createCategory = async (req, res) => {
  const { title, color, bgcolor } = req.body;
  let imgUrl = `http://localhost:8080/uploads/thumbnails/default.jpeg`;
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
