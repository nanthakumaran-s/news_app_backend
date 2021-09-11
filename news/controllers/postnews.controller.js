import sandboxmodel from "../../models/sandbox.model.js";
import UserModel from "../../models/user.model.js";
import sendNotification from "../../notifications/newNews.notification.js";

import path from "path";

import __dirname from "../../utils/path.js";
import checkImageContent from "../../Ai/checkImage.Ai.js";
import checkContentToxity from "../../Ai/checkContent.Ai.js";


const createPost = async (req, res) => {
  const { username, title, id, content, timestamp, location, category } =
    req.body;
  
  if ((await checkContentToxity(content)) === false) {
    return res.json({
      success: false,
      data: null,
      desc: "Our Ai Model find your content is not appropriate. Please review It.",
    });
  }

  if ((await checkContentToxity(content)) === "not-loaded") {
    return res.json({
      success: false,
      data: null,
      desc: "Something Happened Wrong. Try Again after few seconds.",
    });
  }
  let imgUrl = `http://localhost:8080/uploads/thumbnails/default.jpeg`;
  if (req.files) {
    //check the uploaded image with Ai model
    if (await checkImageContent(req.filfes.image.data)) {
      const image = req.files.image;
      await image.mv(
        `${__dirname}/public/uploads/thumbnails/${username}-${timestamp}-${image.name}`
      );
      imgUrl = `http://localhost:8080/uploads/thumbnails/${username}-${timestamp}-${image.name}`;
    }
  }

  // upload image and then save
  const addposts = {
    title,
    author: id,
    content,
    timestamp: new Date(timestamp),
    location: JSON.parse(location),
    category,
    thumbnail: imgUrl,
  };
  const data = JSON.parse(location);
  //TODO: change homelocation to currentlocation
  const locality = await UserModel.find({
    "home_location.city": data.locality,
  });
  const district = await UserModel.find({
    "home_location.district": data.district,
  });
  const state = await UserModel.find({ "home_location.state": data.state });

  let deviceid;

  if (locality.length > 0) {
    deviceid = locality.map((item) => item.deviceid);
  } else if (district.length > 0) {
    deviceid = district.map((item) => item.deviceid);
  } else if (state.length > 0) {
    deviceid = state.map((item) => item.deviceid);
  }
  const newPost = new sandboxmodel(addposts);
  try {
    newPost.save().then((doc) => {
      res.status(200).json({
        success: true,
        data: doc,
        desc: "Added successfully",
      });
      if (deviceid.length > 0) {
        sendNotification(
          title,
          content.substring(0, 50),
          imgUrl.replace(/\s+/g, "-"),
          deviceid
        );
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, desc: "Something went wrong" });
  }
};
export default createPost;
