import PublishModel from "../../models/publish.model.js";

const createPost = (req, res) => {
  const post = req.body;

  // upload image and then save

  const newPost = new PublishModel(post);
  try {
    newPost.save().then((doc) => {
      res.status(200).json({
        success: true,
        data: doc,
        desc: "Added successfully",
      });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, desc: "Something went wrong" });
  }
};
export default createPost;
