import PublishModel from "../../models/publish.model.js";

const createPost = async (req, res) => {
  const post = req.body;
  const newPost = new PublishModel(post);
  try {
    await newPost.save();
    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export default createPost;
