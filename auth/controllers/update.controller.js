//model
import User from "../../models/user.model.js";

//dependency
import __dirname from "../../utils/path.js";

const updateprofile = async (req, res) => {
  // const avatar = req.files;
  const { username } = req.body;
  // let imgUrl = "";
  // if (avatar && avatar.image) {
  //   const data = new FormData();
  //   data.append("image", avatar.image.data);
  //   data.append("type", "avatars");
  //   data.append("username", username);
  //   data.append(
  //     "api_key",
  //     "B5AA1476BA32FA38F8C4FD6CCEAC9DB96B4E50545D7BB186A4329153135D98E8"
  //   );
  //   data.append("api_secret", "9EF635C8D1433FB9746C02FE04BEAF3B");
  //   const res = await fetch("https://return201-s3.me/api/v1/upload", {
  //     method: "POST",
  //     body: data,
  //   });
  //   const json = await res.json();
  //   imgUrl = await json.imgUrl;
  //   User.findOneAndUpdate(
  //     { username },
  //     {
  //       avatar: imgUrl,
  //       ...req.body,
  //     },
  //     {
  //       new: true,
  //     }
  //   )
  //     .then((user) => {
  //       return res.json({
  //         success: true,
  //         data: user,
  //       });
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //       return res.json({
  //         success: false,
  //         desc: "Something Went Wrong. Try Again later.",
  //       });
  //     });
  // }

  const update_doc = {
    ...req.body,
  };

  delete update_doc["username"];

  User.findOneAndUpdate({ username }, update_doc, {
    new: true,
  })
    .then((user) => {
      return res.json({
        success: true,
        data: user,
      });
    })
    .catch((err) => {
      console.error(err);
      return res.json({
        success: false,
        desc: "Something Went Wrong. Try Again later.",
      });
    });
};

export default updateprofile;
