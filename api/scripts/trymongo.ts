// local connection string en docker


export {}; // para que las const sean locales a este archivo


const url = `mongodb://127.0.0.1:27017/`;
//const url = `mongodb://0.0.0.0:27017/`;
//const url = `mongodb://172.17.0.2:27017/`;

// Mongodb Atlas connection string
//const url = `mongodb+srv://admin:Ji9vfIASQ7NnFwN8@cluster0.30imzhm.mongodb.net`;

const MongoClient = require("mongodb").MongoClient;
const client = new MongoClient(url, { useNewUrlParser: true });

let db : any;

async function listCollection(database_name: string, collection_name: string) : Promise<any> {
  await connectToDb(database_name);
  const issues = await db.collection(collection_name).find({}).toArray();
  return issues;
  //console.log(issues);
}

async function connectToDb(database_name:string) {
  await client.connect();
  console.log("Connected to MongoDB at", url);
  db = client.db(database_name);
}

async function show(database_name: string, collection_name:string) {
  const result = await listCollection(database_name,collection_name) 
  console.log(result);
}


async function initialiceSchema() {

  const issuesDB = [
    {
      id: 1,
      status: "New",
      owner: "Ravan",
      effort: 5,
      created: new Date("2018-08-15"),
      due: undefined,
      issue_title: "Error in console when clicking Add",
    },
    {
      id: 2,
      status: "Assigned",
      owner: "Eddie",
      effort: 14,
      created: new Date("2018-08-16"),
      due: new Date("2018-08-30"),
      issue_title: "Missing bottom border on panel",
    },
    {
      id: 3,
      status: "Ready",
      owner: "Sofi",
      effort: 33,
      created: new Date("2023-09-27"),
      due: new Date("2023-10-30"),
      issue_title: "Read all book in English",
    },
  ];
  
  await connectToDb("issuetracker");

  db.createCollection("issues");
  await db.collection("issues").insertMany(issuesDB);
  const count = await db.collection("issues").count();
  console.log('Inserted ', count, ' issues');
  
  db.collection("issues").createIndex({ id: 1 }, { unique: true });
  db.collection("issues").createIndex({ status: 1 });
  db.collection("issues").createIndex({ owner: 1 });
  db.collection("issues").createIndex({ created: 1 });

  // counters collection
  db.createCollection("counters");
  await db.collection("counters").insertOne({ _id: 'issues', current: count });

}


//show("sample_training","companies");
//show("sample_restaurants","restaurants");
initialiceSchema();