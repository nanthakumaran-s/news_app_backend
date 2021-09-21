import sandboxmodel from "../../models/sandbox.model.js";
import UserModel from "../../models/user.model.js";
import sendNotification from "../../notifications/newNews.notification.js";

import FormData from "form-data";
import fetch from "node-fetch";
import __dirname from "../../utils/path.js";
import checkImageContent from "../../Ai/checkImage.Ai.js";
import checkContentToxity from "../../Ai/checkContent.Ai.js";

const createPost = async (req, res) => {
  const {
    username,
    title,
    id,
    content,
    aicontent,
    timestamp,
    location,
    category,
  } = req.body;
  let imgUrl = `https://return201-s3.me/uploads/thumbnails/default.jpeg`;

  if ((await checkContentToxity(aicontent)) === false) {
    return res.json({
      success: false,
      data: null,
      desc: "Our Ai Model find your content is not appropriate. Please review It.",
    });
  }

  if ((await checkContentToxity(aicontent)) === "not-loaded") {
    return res.json({
      success: false,
      data: null,
      desc: "Something Happened Wrong. Try Again after few seconds.",
    });
  }

  if (req.files) {
    //check the uploaded image with Ai model
    if (await checkImageContent(req.files.image.data)) {
      const data = new FormData();
      data.append("image", req.files.image.data);
      data.append("title", title.replace(/\s+/g, "-"));
      data.append("type", "thumbnails");
      data.append("username", username);
      data.append("timestamp", timestamp);
      data.append(
        "api_key",
        "B5AA1476BA32FA38F8C4FD6CCEAC9DB96B4E50545D7BB186A4329153135D98E8"
      );
      data.append("api_secret", "9EF635C8D1433FB9746C02FE04BEAF3B");
      const res = await fetch("https://return201-s3.me/api/v1/upload", {
        method: "POST",
        body: data,
      });
      const json = await res.json();
      imgUrl = json.imgUrl;
    }
  }

  const data = JSON.parse(location);
  //TODO: change homelocation to currentlocation
  const locality = await UserModel.find({
    "home_location.city": data.locality,
  });
  const district = await UserModel.find({
    "home_location.district": data.district,
  });
  const state = await UserModel.find({ "home_location.state": data.state });

  let deviceid = [];

  if (locality.length > 0) {
    deviceid = await locality.map((item) => item.deviceid);
  } else if (district.length > 0) {
    deviceid = await district.map((item) => item.deviceid);
  } else if (state.length > 0) {
    deviceid = await state.map((item) => item.deviceid);
  }
  const addposts = {
    title,
    author: id,
    content,
    sendcount: deviceid.length,
    timestamp: new Date(timestamp),
    location: JSON.parse(location),
    category,
    thumbnail: imgUrl,
  };
  const newPost = new sandboxmodel(addposts);
  try {
    newPost.save().then((doc) => {
      res.status(200).json({
        success: true,
        data: doc,
        desc: "Added successfully",
      });
      if (deviceid.length > 0) {
        const user_id_idx = deviceid.indexOf(id);
        deviceid.splice(user_id_idx, 1);
        sendNotification(
          title,
          content.substring(0, 50),
          imgUrl.replace(/\s+/g, "-"),
          doc._id,
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
