import PublishModel from "../../models/publish.model.js";
import Sandbox from "../../models/sandbox.model.js"; // for demo purpose only

const updateShareCount = (req, res) => {
  const { id } = req.body;

  // Bad Request
  if (id === undefined) {
    res.status(400).json({
      success: false,
      desc: "Bad Request",
    });
    return null;
  }

  Sandbox.findOneAndUpdate(
    { _id: id },
    { $inc: { sharecount: 1 } },
    { new: true }
  )
    .then((data) => {
      res.status(200).json({ success: true, data: data });
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({
        success: false,
        desc: "Something Went Wrong.",
      });
    });
};

export default updateShareCount;
