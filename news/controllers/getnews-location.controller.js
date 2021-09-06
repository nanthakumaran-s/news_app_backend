import PublishModel from "../../models/publish.model.js";
import Sandbox from "../../models/sandbox.model.js"; // for demo purpose only

const getNewsByLocation = async (req, res) => {
  const { location, province } = req.query;
  if (location === undefined || province === undefined) {
    res.status(400).json({
      success: false,
      desc: "Bad Request",
    });
    return null;
  }

  const page = req.query.page ? parseInt(req.query.page) : 1;
  const limit = req.query.limit ? parseInt(req.query.limit) : 10;

  const startIdx = (page - 1) * limit;
  const endIdx = page * limit;

  let resultData;
  switch (province) {
    case "country":
      resultData = await Sandbox.find({
        "location.country": location,
      })
        .populate("author", "username email fullname avatar")
        .sort({ timestamp: -1 })
        .skip(parseInt(startIdx))
        .limit(limit)
        .exec();
      break;

    case "district":
      resultData = await Sandbox.find({
        "location.district": location,
      })
        .populate("author", "username email fullname avatar")
        .sort({ timestamp: -1 })
        .skip(parseInt(startIdx))
        .limit(limit)
        .exec();
      break;

    case "locality":
      resultData = await Sandbox.find({
        "location.locality": location,
      })
        .populate("author", "username email fullname avatar")
        .sort({ timestamp: -1 })
        .skip(parseInt(startIdx))
        .limit(limit)
        .exec();
      break;

    default:
      resultData = await Sandbox.find({
        "location.state": location,
      })
        .populate("author", "username email fullname avatar")
        .sort({ timestamp: -1 })
        .skip(parseInt(startIdx))
        .limit(limit)
        .exec();
      break;
  }

  const results = {
    next: {},
    previous: {},
    data: resultData,
  };

  let count;
  switch (province) {
    case "country":
      count = await Sandbox.countDocuments({
        "location.country": location,
      }).exec();
      break;

    case "district":
      count = await Sandbox.countDocuments({
        "location.district": location,
      }).exec();
      break;

    case "locality":
      count = await Sandbox.countDocuments({
        "location.locality": location,
      }).exec();
      break;

    default:
      count = await Sandbox.countDocuments({
        "location.state": location,
      }).exec();
      break;
  }

  if (endIdx < count) {
    results.next = {
      page: page + 1,
      limit: limit,
      gonext: true,
    };
  }

  if (startIdx - limit > 0) {
    results.previous = {
      page: page - 1,
      limit: limit,
      goprev: true,
    };
  }

  res.status(200).json({
    success: true,
    data: results,
  });
};

export default getNewsByLocation;
