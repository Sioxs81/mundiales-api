# API Mundiales FIFA

API REST sobre las ediciones de la Copa Mundial de la FIFA, construida con
**Node.js + Express**, persistencia en **SQLite** (modulo nativo `node:sqlite`)
y validacion de entrada con **Zod**.

## Requisitos

- Node.js **22+** (necesario para `node:sqlite`).
- `npm` (o `pnpm`).

## Instalacion

```bash
npm install
```

Crea el archivo `.env` a partir de `.env.example`:

```bash
copy .env.example .env   # PowerShell / Windows
# cp .env.example .env    # Linux / macOS
```

Contenido de `.env`:

```
HOST=localhost
PORT=4321
```

## Poblar la base de datos

Genera `data/mundiales.db` a partir de `data/data.json` y `data/CREATE.SQL`:

```bash
npm run db
```

> Si aparece un error de `node:sqlite`, tu version de Node es anterior a la 22.
> Actualiza Node, o ejecuta con el flag: `node --experimental-sqlite data/createdb.js`.

## Ejecutar

```bash
npm run dev     # con recarga automatica (nodemon)
npm start       # sin recarga
```

Servidor en `http://localhost:4321/`.

## Rutas

| Metodo | Ruta              | Descripcion                                            |
| ------ | ----------------- | ------------------------------------------------------ |
| GET    | `/`               | Informacion de la API                                  |
| GET    | `/mundiales`      | Lista de slugs (`?include=full` para datos completos)  |
| GET    | `/mundial/:slug`  | Edicion concreta por slug                              |
| GET    | `/campeon/:pais`  | Slugs de las ediciones ganadas por ese pais            |
| GET    | `/random`         | Una edicion al azar                                    |
| GET    | `/search/:text`   | Busqueda por texto (minimo 3 caracteres)               |
| GET    | `/imagenes/*`     | Imagenes estaticas de cada edicion                     |

## Codigos HTTP

- `200` OK — peticion exitosa, se devuelven datos.
- `400` Bad Request — la validacion de entrada (Zod) fallo.
- `404` Not Found — el recurso no existe o la ruta no esta definida.

## Imagenes

El campo `imagen` de cada edicion (p. ej. `qatar-2022.avif`) se sirve en
`/imagenes/`. Para verla, abre en el navegador:

```
http://localhost:4321/imagenes/qatar-2022.avif
```

## Estructura del proyecto

```
mundiales-api/
├── index.js                 # App Express: rutas + estaticos + 404
├── .env / .env.example
├── data/
│   ├── data.json            # Datos semilla (8 ediciones)
│   ├── CREATE.SQL           # Script de creacion de tabla
│   ├── createdb.js          # Crea y puebla la BD
│   └── mundiales.js         # Repositorio (acceso a SQLite)
├── routes/mundiales/        # Controladores
│   ├── getAll.js
│   ├── getBySlug.js
│   ├── getByCampeon.js
│   ├── random.js
│   ├── search.js
│   └── search.schema.js     # Esquema Zod
└── public/imagenes/         # Imagenes (.avif)
```
