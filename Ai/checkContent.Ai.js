import { toxityModel } from "../utils/tfmodels.js";

const checkContentToxity = async (content) => {
  if (toxityModel && content) {
    const results = [];
    const predictions = await toxityModel.classify(content);
    predictions.forEach((res) => {
      results.push(res["results"][0]["match"]);
    });
    return !results.includes(true);
  } else return "not-loaded";
};

export default checkContentToxity;
