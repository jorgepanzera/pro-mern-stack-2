// Importar express http server
const express = require("express");

// crear aplicacion express
const app = express();

// para usar el absolute path de una aplicacion
const path = require("path");

// funcion de express static para acceder al contenido de una carpeta
//console.log(path.join(__dirname, 'public'));
const fileServerMiddlewareconst = express.static(
  path.join(__dirname, "..", "public")
); // _dirname/.. me deja en la carpeta raiz

// usar dicha carpeta
app.use("/", fileServerMiddlewareconst);

// start server en puerto 3000
app.listen(8000, function () {
  console.log("UI started on port 8000");
});
