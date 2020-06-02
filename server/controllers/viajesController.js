const Viajes = require("../models/Viaje");

exports.mostrarViajes = async (req, res) => {
  const viajes = await Viajes.findAll();

  res.render("viajes", {
    pagina: "Proximos viajes",
    viajes,
  });
};

exports.mostrarViaje = (req, res) => {
  Viajes.findByPk(req.params.id)
    .then((viaje) =>
      res.render("viaje", {
        viaje,
      })
    )
    .catch((error) => console.log(error));
};
