import PublishModel from "../../models/publish.model.js";
import Sandbox from "../../models/sandbox.model.js"; // for demo purpose only

const getTrending = async (req, res) => {
  const category = req.query.category || "all";

  const page = req.query.page ? parseInt(req.query.page) : 1;
  const limit = req.query.limit ? parseInt(req.query.limit) : 10;
  const startIdx = (page - 1) * limit;
  const endIdx = page * limit;

  let resultData;
  switch (category) {
    case "all":
      resultData = await Sandbox.find()
        .populate("author", "username email fullname avatar")
        .sort({ sharecount: -1 })
        .skip(parseInt(startIdx))
        .limit(limit)
        .exec();
      break;

    default:
      resultData = await Sandbox.find({ category: category })
        .populate("author", "username email fullname avatar")
        .sort({ sharecount: -1 })
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
  switch (category) {
    case "all":
      count = await Sandbox.countDocuments().exec();
      break;

    default:
      count = await Sandbox.countDocuments({
        category: category,
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

  if (startIdx > 0) {
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

export default getTrending;
