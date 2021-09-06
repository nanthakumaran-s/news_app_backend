import sandboxmodel from "../../models/sandbox.model.js";
import path from "path";

import __dirname from "../../utils/path.js";
const createPost = async (req, res) => {
  const { username, title, id, content, timestamp, location, category } =
    req.body;
  let imgUrl = `http://localhost:8080/uploads/thumbnails/default.jpeg`;
  if (req.files) {
    const image = req.files.image;
    await image.mv(
      `${__dirname}/public/uploads/thumbnails/${username}-${timestamp}-${image.name}`
    );
    imgUrl = `http://localhost:8080/uploads/thumbnails/${username}-${timestamp}-${image.name}`;

  }
  // upload image and then save
  const addposts = {
    title,
    author: id,
    content,
    timestamp: new Date(timestamp),
    location: JSON.parse(location),
    category,
    thumbnail: imgUrl
  };
  
  const newPost = new sandboxmodel(addposts);
  try {
    newPost.save().then((doc) => {
      res.status(200).json({
        success: true,
        data: doc,
        desc: "Added successfully"
      });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, desc: "Something went wrong" });
  }
};
export default createPost;
