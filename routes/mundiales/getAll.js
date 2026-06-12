import * as mundial from "../../data/mundiales.js";
import { withImageUrl } from "./withImageUrl.js";

export const getAll = (req, res) => {
  const isFull = req.query.include === "full";
  const contents = isFull
    ? mundial.getFull().map(m => withImageUrl(req, m))
    : mundial.getAll();
  res.json(contents);
};