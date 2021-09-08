import nsfw from "nsfwjs";
import * as toxity from "@tensorflow-models/toxicity";

let nsfwModel;
let toxityModel;

const loadnsfwModel = async () => {
  nsfwModel = await nsfw.load();
  return;
};

const loadtoxityModel = async () => {
  toxityModel = await toxity.load();
  return;
};

export { nsfwModel, toxityModel, loadnsfwModel, loadtoxityModel };
