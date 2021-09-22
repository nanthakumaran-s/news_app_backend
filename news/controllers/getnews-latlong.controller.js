import PublishModel from "../../models/publish.model.js";


const getLocationLatLong = (req, res) => {
  const { lat, long } = req.query;

  // Bad Request
  if (lat === undefined || long === undefined) {
    res.status(400).json({ success: false, desc: "Bad Request" });
    return null;
  }

  PublishModel.find({ "location.lat": lat, "location.long": long })
    .populate("author", "username email fullname avatar")
    .then((news) => {
      if (news === null) {
        res.status(200).json({ success: false, desc: "News not found" });
      } else {
        res.status(200).json({ success: true, desc: "News found", data: news });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ success: false, desc: "Something went wrong" });
    });
};

export default getLocationLatLong;
