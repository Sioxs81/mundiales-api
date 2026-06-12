import express from "express";

import { getAll } from "./routes/mundiales/getAll.js";
import { getBySlug } from "./routes/mundiales/getBySlug.js";
import { getByCampeon } from "./routes/mundiales/getByCampeon.js";
import { random } from "./routes/mundiales/random.js";
import { search } from "./routes/mundiales/search.js";

// Cargamos HOST y PORT desde el .env (soporte nativo de Node)
try {
  process.loadEnvFile();
} catch {
  // Si no existe .env usamos los valores por defecto
}

const app = express();
app.enable("strict routing");

const HOST = process.env.HOST ?? "localhost";
const PORT = process.env.PORT ?? 4321;

// Informacion de la API
app.get("/", (req, res) => res.json({
  nombre: "API Mundiales FIFA",
  version: "1.0",
  rutas: ["/mundiales", "/mundial/:slug", "/campeon/:pais", "/random", "/search/:text", "/imagenes/*"]
}));

// Rutas de la API
app.get("/mundiales", getAll);
app.get("/mundial/:slug", getBySlug);
app.get("/campeon/:pais", getByCampeon);
app.get("/random", random);
app.get("/search/:text", search);

// Imagenes estaticas -> /imagenes/qatar-2022.avif
app.use(express.static("public"));

// Catch-all: cualquier otra ruta devuelve 404 en JSON
app.use((req, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

app.listen(PORT, HOST, () => {
  console.log(`Server at http://${HOST}:${PORT}/`);
});
