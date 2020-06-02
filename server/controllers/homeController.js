const Viajes = require("../models/Viaje");
const Testimonial = require("../models/Testimoniales");

exports.consulasHomePage = (req, res) => {
  //arreglo de promesas

  const promises = [];
  promises.push(
    Viajes.findAll({
      limit: 3,
    })
  );
  promises.push(
    Testimonial.findAll({
      limit: 3,
    })
  );
  //pasar el promise y ejecutarlo
  const resultado = Promise.all(promises);

  resultado
    .then((resultado) =>
      res.render("index", {
        pagina: "Bienvenidos",
        viajes: resultado[0],
        testimoniales: resultado[1],
        clase: "home",
      })
    )
    .catch((error) => console.log(error));
};
