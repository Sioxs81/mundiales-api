DROP TABLE IF EXISTS mundiales;

CREATE TABLE mundiales (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nombre TEXT NOT NULL,
  anio INTEGER,
  sede TEXT,
  campeon TEXT,
  subcampeon TEXT,
  goleador TEXT,
  equipos INTEGER,
  imagen TEXT,
  slug TEXT UNIQUE NOT NULL,
  resumen TEXT,
  descripcion TEXT
);