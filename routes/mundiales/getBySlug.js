import * as mundial from "../../data/mundiales.js";
import { withImageUrl } from "./withImageUrl.js";

const notFound = (res, message) => {
  return res.status(404).json({ error: message });
};

export const getBySlug = (req, res) => {
  const selected = mundial.getBySlug(req.params.slug);

  if (!selected)
    return notFound(res, "Mundial no encontrado");

  res.json(withImageUrl(req, selected));
};