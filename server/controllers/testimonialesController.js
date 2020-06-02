const Testimonial = require("../models/Testimoniales");
exports.mostrarTestimoniales = async (req, res) => {
  const testimoniales = await Testimonial.findAll();
  res.render("testimoniales", {
    pagina: "los testimoniales",
    testimoniales,
  });
};

exports.agregarTestimonial = (req, res) => {
  //console.log(req.body);
  let { nombre, correo, mensaje } = req.body;
  let errores = [];
  if (!nombre) {
    errores.push({ mensaje: "Agregar un nombre" });
  }
  if (!correo) {
    errores.push({ mensaje: "Agregar un correo" });
  }
  if (!mensaje) {
    errores.push({ mensaje: "Agregar un mensaje" });
  }

  //revisar por errores
  if (errores.length > 0) {
    //muestra la vista con errores
    Testimonial.findAll().then((testimoniales) =>
      res.render("testimoniales", {
        errores,
        nombre,
        correo,
        mensaje,
        pagina: "testimoniles",
        testimoniales,
      })
    );
  } else {
    Testimonial.create({
      nombre,
      correo,
      mensaje,
    })
      .then((testimonial) => res.redirect("/testimoniales"))
      .catch((error) => console.log(error));
  }
};
