// local connection string en docker

//const url = `mongodb://localhost:27017/`;
//const url = `mongodb://0.0.0.0:27017/`;
//const url = `mongodb://172.17.0.2:27017/`;

// Mongodb Atlas connection string
const url = `mongodb+srv://admin:Ji9vfIASQ7NnFwN8@cluster0.30imzhm.mongodb.net`;

const MongoClient = require("mongodb").MongoClient;

let db: any;

async function listCollection(database_name: string, collection_name: string) : Promise<any> {
  await connectToDb(database_name);
  const issues = await db.collection(collection_name).find({}).toArray();
  return issues;
  //console.log(issues);
}

async function connectToDb(database_name:string) {
  const client = new MongoClient(url, { useNewUrlParser: true });
  await client.connect();
  console.log("Connected to MongoDB at", url);
  db = client.db(database_name);
}

async function show(database_name: string, collection_name:string) {
  const result = await listCollection(database_name,collection_name) 
  console.log(result);
}

show("sample_restaurants","restaurants");


/*
function testWithCallbacks(callback: any): void {
  console.log("\n--- testWithCallbacks ---");

  MongoClient.connect(url, function (err: any, db: any) {
    if (err) throw err;
    var dbo = db.db("my-test-db");
    console.log("Connected to MongoDB");

    const collection = dbo.collection("calls");
    const message = {
      message: "Mensaje de prueba desde trymongo.ts",
      scope: "trymongo.ts",
      host: "LAPTOP-GM0OSER6",
      date: "2022-12-10T11:58:24.724+00:00",
      location: "America/Montevideo",
      offset: "UTC-3",
    };
    collection.insertOne(message, function (err: any, result: any) {
      if (err) {
        MongoClient.close();
        callback(err);
        return;
      }
      console.log("Result of insert:\n", result.insertedId);
      collection
        .find({ _id: result.insertedId })
        .toArray(function (err: any, docs: any) {
          if (err) {
            MongoClient.close();
            callback(err);
            return;
          }
          console.log("Result of find:\n", docs);
          MongoClient.close();
          callback(err);
        });
    });
  }); // connect
}

testWithCallbacks(function (err: any) {
  if (err) {
    console.log(err);
  }
});
*/
