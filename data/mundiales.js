import { DatabaseSync } from "node:sqlite";
import { cwd } from "node:process";

const db = new DatabaseSync(`${cwd()}/data/mundiales.db`);

export const getAll = () => {
  const query = db.prepare("SELECT slug FROM mundiales");
  return query.all();
};

export const getFull = () => {
  const query = db.prepare("SELECT * FROM mundiales");
  return query.all();
};

export const getBySlug = slug => {
  const query = db.prepare("SELECT * FROM mundiales WHERE slug = ?");
  return query.get(slug);
};

export const getByCampeon = pais => {
  const query = db.prepare("SELECT slug FROM mundiales WHERE campeon = ?");
  return query.all(pais);
};

export const getRandom = () => {
  const query = db.prepare("SELECT * FROM mundiales ORDER BY RANDOM() LIMIT 1");
  return query.get();
};

export const search = text => {
  const query = db.prepare(
    "SELECT slug FROM mundiales WHERE nombre LIKE ? OR descripcion LIKE ?"
  );
  return query.all(`%${text}%`, `%${text}%`);
};
