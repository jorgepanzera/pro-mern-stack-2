// Importar express http server
const express = require("express");
const cors = require("cors");
const http = require("http");

// crear aplicacion express
const app = express();

// para usar el absolute path de una aplicacion

//const url = `mongodb://localhost:27017/`;
const url = `mongodb://0.0.0.0:27017/`;
//const url = `mongodb://172.17.0.2:27017/`;

// Mongodb Atlas connection string
//const url = `mongodb+srv://admin:Ji9vfIASQ7NnFwN8@cluster0.30imzhm.mongodb.net`;

const MongoClient = require("mongodb").MongoClient;
const client = new MongoClient(url, { useNewUrlParser: true });

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

app.use(cors()); // permitir consumir todos los metodos desde cualquier dominio

// Logging de todo lo que entra a la API
app.use((req:any, res:any, next:void) => {
  
  /** Log the req */
  console.log(`Incomming - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

  res.on('finish', () => {
      /** Log the res */
      console.log(`Result - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}] - STATUS: [${res.statusCode}]`);
  });

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

// ARMAR app.put para dar de alta un issue, el id es countCollectionDocuments+1, el resto ver el libro

// start server en puerto 3000
(async function () {
  try {
    await connectToDb("issuetracker");
    app.listen(3000, function () {
      console.log("API server started on port 3000");
    });
  } catch (err) {
    console.log("ERROR:", err);
  }
})();
