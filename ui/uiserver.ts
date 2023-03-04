// Importar express http server
const express = require("express");

// crear aplicacion express
const app = express();

// para usar el absolute path de una aplicacion
const path = require("path");

// dotenv para multiples ambientes
require("dotenv").config();

// port para el ui server
const port = process.env.UI_SERVER_PORT;

const UI_API_ENDPOINT = process.env.UI_API_ENDPOINT || "http://localhost:3000";
const env = { UI_API_ENDPOINT };

// get para generar en runtime un env.js, que expone un WINDOW.ENV con el valor obtenido en el .env para el api endpoint
app.get("/env.js", function (req: any, res: any) {
  res.send(`window.ENV = ${JSON.stringify(env)}`);
});

// funcion de express static para acceder al contenido de una carpeta
//console.log(path.join(__dirname, 'public'));
const fileServerMiddlewareconst = express.static(
  path.join(__dirname, "public")
); // _dirname/.. me deja en la carpeta raiz

// usar dicha carpeta
app.use("/", fileServerMiddlewareconst);

// start server en puerto 3000
app.listen(port, function () {
  console.log(`UI started on port ${port}`);
});
