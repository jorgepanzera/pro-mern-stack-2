// Importar express http server
const express = require("express");
const cors = require("cors");
const http = require("http");
require("dotenv").config();

// crear aplicacion express
const app = express();

// para usar el absolute path de una aplicacion

// Desde archivo .env con default local
const url = process.env.DB_URL || `mongodb://0.0.0.0:27017/`;
//const url = `mongodb://172.17.0.2:27017/`;
//const url = `mongodb://localhost:27017/`;
// Mongodb Atlas connection string - tiene pocas consultas
//const url = `mongodb+srv://admin:Ji9vfIASQ7NnFwN8@cluster0.30imzhm.mongodb.net`;

// port para la API, desde archivo .env con default 3000
const port = process.env.API_SERVER_PORT || 3000;

const MongoClient = require("mongodb").MongoClient;
const client = new MongoClient(url, { useNewUrlParser: true });

const enableCors = (process.env.ENABLE_CORS || 'true') == 'true';
console.log('CORS free:', enableCors);

let db: any;

async function issueListfromServer(): Promise<any[]> {
  // con esta se obtienen todos los issues, GET ALL
  const issues = await db.collection("issues").find({}).toArray();
  return issues;
}

async function countCollectionDocuments(
  collection_name: string
): Promise<number> {
  return await db.collection(collection_name).count();
}

async function connectToDb(database_name: string) {
  await client.connect();
  console.log("Connected to MongoDB at", url);
  db = client.db(database_name);
}

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// la forma de hacer segura la API serian:
//  en el uiserver.ts establecer un proxy para llamar desde alli a la API, y no desde el browser por direct call (promernstack cap 7.3)
//  direct calls a la API desde el browser (fetch), y que el server (este) permita todos los origines, o solamente aquellos 
//  permitidos (que pueden setearse inclusive desde una BD) (https://stackabuse.com/handling-cors-with-node-js/)
if (enableCors) {
  app.use(cors()); // permitir consumir todos los metodos desde cualquier dominio
}


// Logging de todo lo que entra a la API

app.use((req:any, res:any, next: () => {}) => { // defino una funcion next que no hace nada, solo para que el app.use la pueda llamar
  
  // Log the req 
  console.log(`Incomming - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

  res.on('finish', () => {
      // Log the res 
      console.log(`Result - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}] - STATUS: [${res.statusCode}]`);
  });

  next(); 

});


// HealthCheck - metodo get simple para comprobar que esta "vivo" el servicio
app.get("/ping", (req: any, res: any, next: void) =>
  res.status(200).json({ hello: "world" })
);

// GetAllIssues - GET
app.get("/issues", async (req: any, res: any, next: void) => {
  try {
    let issues = await issueListfromServer();
    res.status(200).json({ issues });
  } catch (error) {
    res.status(500).json({ error });
  }
});


// post de prueba
app.post("/", (req:any, res:any ) => {
  res.send("Hice un post");
}
);

// CreateIssue - POST
app.post("/issue/create", async (req: any, res: any, next: void) => {
  try {
    let issue = req.body;
    //let cant = await countCollectionDocuments(collection_name);
    let new_id = await getNextSequence("issues");
    issue.id = new_id;
    issue.created = new Date();
    const result = await db.collection("issues").insertOne(issue);
    const savedIssue = await db.collection("issues").findOne({ _id: result.insertedId }); // lo busco y lo devuelvo para asegurar que anduvo
    res.status(200).json({ savedIssue });
  } catch (error) {
    res.status(500).json({ error });
  }
});

app.get("/test", async (req: any, res: any, next: void) => {
  try {
    let collection_name = req.headers.collection_name;
    //let cant = await countCollectionDocuments(collection_name);
    let cant = await getNextSequence(collection_name);
    res.status(200).json({ cant });
  } catch (error) {
    res.status(500).json({ error });
  }
});

async function getNextSequence(collection_name: string): Promise<number> {
  const result = await db
    .collection("counters")
    .findOneAndUpdate(
      { _id: collection_name },
      { $inc: { current: 1 } },
      { returnOriginal: false }
    );
  return result.value.current;
}


// start server en puerto 3000
(async function () {
  try {
    await connectToDb("issuetracker");
    app.listen(port, function () {
      console.log(`API server started on port ${port}`);
    });
  } catch (err) {
    console.log("ERROR:", err);
  }
})();
