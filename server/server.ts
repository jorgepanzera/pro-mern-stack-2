// Importar express http server
const express = require("express");

// crear aplicacion express
const app = express();

// para usar el absolute path de una aplicacion
const path = require("path");

//const url = `mongodb://localhost:27017/`;
const url = `mongodb://0.0.0.0:27017/`;
//const url = `mongodb://172.17.0.2:27017/`;

// Mongodb Atlas connection string
//const url = `mongodb+srv://admin:Ji9vfIASQ7NnFwN8@cluster0.30imzhm.mongodb.net`;

const MongoClient = require("mongodb").MongoClient;
const client = new MongoClient(url, { useNewUrlParser: true });

let db: any;

export async function issueListfromServer() {
  // con esta se obtienen todos los issues, GET ALL
  const issues = await db.collection("issues").find({}).toArray();
  console.log(issues);
  return issues;
}

async function connectToDb(database_name: string) {
  await client.connect();
  console.log("Connected to MongoDB at", url);
  db = client.db(database_name);
}

// funcion de express static para acceder al contenido de una carpeta
//console.log(path.join(__dirname, 'public'));
const fileServerMiddlewareconst = express.static(
  path.join(__dirname, "..", "public")
); // _dirname/.. me deja en la carpeta raiz

// usar dicha carpeta
app.use("/", fileServerMiddlewareconst);

// start server en puerto 3000
(async function () {
  try {
    await connectToDb("issuetracker");
    app.listen(3000, function () {
      console.log("App started on port 3000");
    });
  } catch (err) {
    console.log("ERROR:", err);
  }
})();
