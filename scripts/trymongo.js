"use strict";

// local connection string en docker

//const url = `mongodb://localhost:27017/`;
var url = "mongodb://0.0.0.0:27017/";
//const url = `mongodb://172.17.0.2:27017/`;

// Mongodb Atlas connection string
//const url = `mongodb+srv://admin:Ji9vfIASQ7NnFwN8@cluster0.30imzhm.mongodb.net/test`;

var _require = require("mongodb"),
  MongoClient = _require.MongoClient;
function testWithCallbacks(callback) {
  console.log("\n--- testWithCallbacks ---");
  var client = new MongoClient(url, {
    useNewUrlParser: true
  });
  client.connect(function (err, client) {
    if (err) {
      callback(err);
      return;
    }
    console.log("Connected to MongoDB");
    var db = client.db();
    var collection = db.collection("calls");
    var message = {
      message: "Mensaje de prueba desde trymongo.ts",
      scope: "trymongo.ts",
      host: "LAPTOP-GM0OSER6",
      date: "2022-12-10T11:58:24.724+00:00",
      location: "America/Montevideo",
      offset: "UTC-3"
    };
    collection.insertOne(message, function (err, result) {
      if (err) {
        client.close();
        callback(err);
        return;
      }
      console.log("Result of insert:\n", result.insertedId);
      collection.find({
        _id: result.insertedId
      }).toArray(function (err, docs) {
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
testWithCallbacks(function (err) {
  if (err) {
    console.log(err);
  }
});
//# sourceMappingURL=trymongo.js.map