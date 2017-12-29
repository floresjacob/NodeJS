const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const dboper = require('./operations');
const url = 'mongodb://localhost:27017/conFusion';


// const writeDishes = function(db, callback){
//     const collection = db.collection("dishes");
//
//
//     Example 1; with .collection for Mongo 3.x
    // collection.insertOne({"name": "Uthappizza", "description": "test_0"},
    // (err, result) => {
    //     assert.equal(err,null);
    //
    //     console.log("After Insert:\n");
    //     console.log(result.ops);
    //
    //     collection.find({}).toArray((err, docs) => {
    //         assert.equal(err,null);
    //
    //         console.log("Found:\n");
    //         console.log(docs);
    //
    //         db.dropCollection("dishes", (err, result) => {
    //             assert.equal(err,null);
    //         });
    //         callback;
    //     });
    // });
//
//   }

MongoClient.connect(url, function(err, client){

    assert.equal(err,null);

    const db = client.db('conFusion');

    console.log('Connected correctly to server');
    dboper.insertDocument(db, { name: "Vadonut", description: "Test" },
        "dishes")
        .then((result) => {
            console.log("Insert Document:\n", result.ops);

            return dboper.findDocuments(db, "dishes");
        })
        .then((docs) => {
            console.log("Found Documents:\n", docs);

            return dboper.updateDocument(db, { name: "Vadonut" },
                { description: "Updated Test" }, "dishes");
        })
        .then((result) => {
            console.log("Updated Document:\n", result.result);

            return dboper.findDocuments(db, "dishes");
        })
        .then((docs) => {
            console.log("Found Updated Documents:\n", docs);

            return db.dropCollection("dishes");
        })
        .then((result) => {
            console.log("Dropped Collection: ", result);

            return client.close();
        })
        .catch((err) => console.log(err));
      });
