// local connection string en docker

//const url = `mongodb://localhost:27017/`;
const url = `mongodb://0.0.0.0:27017/`;
//const url = `mongodb://172.17.0.2:27017/`;

// Mongodb Atlas connection string
//const url = `mongodb+srv://admin:Ji9vfIASQ7NnFwN8@cluster0.30imzhm.mongodb.net/test`;

interface myCallbackType {
  (myArgument: string): void;
}

const { MongoClient } = require("mongodb");

function testWithCallbacks(callback: any): void {
  console.log("\n--- testWithCallbacks ---");

  const client = new MongoClient(url, { useNewUrlParser: true });
  client.connect(function (err: any, client: any) {
    if (err) {
      callback(err);
      return;
    }
    console.log("Connected to MongoDB");
    const db = client.db();
    const collection = db.collection("calls");
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
        client.close();
        callback(err);
        return;
      }
      console.log("Result of insert:\n", result.insertedId);
      collection
        .find({ _id: result.insertedId })
        .toArray(function (err: any, docs: any) {
          if (err) {
            client.close();
            callback(err);
            return;
          }
          console.log("Result of find:\n", docs);
          client.close();
          callback(err);
        });
    });
  });
}
testWithCallbacks(function (err: any) {
  if (err) {
    console.log(err);
  }
});
