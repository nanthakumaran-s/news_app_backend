import PublishModel from "../../models/publish.model.js";

const getNewsByLocation = (req, res) => {
  const { location, limit, province } = req.query;
  res.send(location + " " + limit + " " + province);
};

export default getNewsByLocation;
