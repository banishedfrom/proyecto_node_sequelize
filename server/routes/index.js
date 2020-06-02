const express = require("express");
const routes = express.Router();

// controladores

const nosotrosController = require("../controllers/nosotrosControllers");
const homeController = require("../controllers/homeController");
const viajesController = require("../controllers/viajesController");
const testimonialesController = require("../controllers/testimonialesController");

module.exports = function () {
  routes.get("/", homeController.consulasHomePage);

  routes.get("/nosotros", nosotrosController.infoNosotros);

  routes.get("/viajes", viajesController.mostrarViajes);

  routes.get("/viajes/:id", viajesController.mostrarViaje);

  routes.get("/testimoniales", testimonialesController.mostrarTestimoniales);

  //cuando se llena el formulario
  routes.post("/testimoniales", testimonialesController.agregarTestimonial);

  return routes;
};
