import tf from "@tensorflow/tfjs-node";
import { nsfwModel } from "../utils/tfmodels.js";
// tf.enableProdMode(); // enable in production

const checkImageContent = async (buffer) => {
  if (nsfwModel && buffer) {
    const image = await tf.node.decodeImage(buffer, 3);
    const predictions = await nsfwModel.classify(image);
    image.dispose();
    console.log(predictions[0]["className"]);
    return (
      predictions[0]["className"] === "Drawing" ||
      predictions[0]["className"] === "Neutral"
    );
  } else return "not-loaded";
};

export default checkImageContent;
