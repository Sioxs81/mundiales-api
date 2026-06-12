import * as mundial from "../../data/mundiales.js";
import { withImageUrl } from "./withImageUrl.js";

export const random = (req, res) => {
  res.json(withImageUrl(req, mundial.getRandom()));
};