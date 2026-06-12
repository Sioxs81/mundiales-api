import * as mundial from "../../data/mundiales.js";

export const getByCampeon = (req, res) => {
  const mundiales = mundial.getByCampeon(req.params.pais);
  res.json(mundiales);
};
