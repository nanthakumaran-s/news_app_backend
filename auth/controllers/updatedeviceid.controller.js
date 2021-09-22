import User from "../../models/user.model.js";

const updateDeviceId = async (req, res) => {
  const { userid, deviceid } = req.body;

  if (userid === undefined || deviceid == undefined) {
    res.json({ success: false, desc: "Bad request" });
    return null;
  }
  User.findOneAndUpdate({ _id: userid }, { deviceid })
    .then((data) => {
      return res.json({ success: true, desc: "deviceid updated" });
    })
    .catch((err) => {
      console.error(err);
      return res.json({
        success: false,
        desc: "Something Went Wrong. Try Again later."
      });
    });
};

export default updateDeviceId;
