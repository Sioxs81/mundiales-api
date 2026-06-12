import { DatabaseSync } from "node:sqlite";
import { cwd } from "node:process";
import { readFileSync } from "node:fs";
import data from "./data.json" with { type: "json" };

const DATABASE_FILE = `${cwd()}/data/mundiales.db`;
const CREATE_SCRIPT = `${cwd()}/data/CREATE.SQL`;

// Establecemos acceso a la base de datos
const db = new DatabaseSync(DATABASE_FILE);

// Lee el script SQL, lo ejecuta y crea la tabla en SQLite
const sql = readFileSync(CREATE_SCRIPT, "utf-8");
db.exec(sql);

// Preparamos la insercion de datos (evita SQL Injection y mejora rendimiento)
const mundiales = db.prepare(/* SQL */`INSERT INTO mundiales (nombre,
  anio, sede, campeon, subcampeon, goleador, equipos, imagen, slug,
  resumen, descripcion) VALUES (:nombre, :anio, :sede, :campeon,
  :subcampeon, :goleador, :equipos, :imagen, :slug, :resumen, :descripcion)`);

for (const mundial of data) {
  mundiales.run(mundial);
}

console.log("Base de datos creada y poblada con exito.");
