//importar express
const express = require("express");
const routes = require("./routes");
const path = require("path");
const configs = require("./config");
const db = require("./config/database");
const bodyParser = require("body-parser");
require("dotenv").config({ path: "variables.env" });

db.authenticate()
  .then(function () {
    console.log("db conectada");
  })
  .catch((error) => console.log(error));

//configurar expresss
const app = express();

//HABILITAR EL PUG
app.set("view engine", "pug");

//añadir las vistas
app.set("views", path.join(__dirname, "./views"));
//cargar carpeta estatica llamada public
app.use(express.static("public"));

//validar si estamos en desarollo o en produccion
const config = configs[app.get("env")];
//creamos la variable para el sitio web
app.locals.titulo = config.nombresitio;

//muestra el año actual
app.use((req, res, next) => {
  //crear una nueva fecha
  const fecha = new Date();
  res.locals.fechaActual = fecha.getFullYear();
  res.locals.ruta = req.path;
  return next();
});

//ejecutamos el bodyparser
app.use(bodyParser.urlencoded({ extended: true }));

//cargar las rutas de router
app.use("/", routes());

//puesto y host para la app
const HOST = process.env.HOST || "0.0.0.0";
const PORT = process.env.PORT || 3000;
app.listen(PORT, HOST, () => {
  console.log(`Our app is running on port ${PORT}, ${HOST}`);
});
