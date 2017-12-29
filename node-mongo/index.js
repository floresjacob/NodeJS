const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const dboper = require('./operations');
const url = 'mongodb://localhost:27017/conFusion';


const writeDishes = function(db, callback){
    const collection = db.collection("dishes");


    //Example 1; with .collection for Mongo 3.x
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

      dboper.insertDocument(db, { name: "Vadonut", description: "Test"},
        "dishes", (result) => {
            console.log("Insert Document:\n", result.ops);

            dboper.findDocuments(db, "dishes", (docs) => {
                console.log("Found Documents:\n", docs);

                dboper.updateDocument(db, { name: "Vadonut" },
                    { description: "Updated Test" }, "dishes",
                    (result) => {
                        console.log("Updated Document:\n", result.result);

                        dboper.findDocuments(db, "dishes", (docs) => {
                            console.log("Found Updated Documents:\n", docs);

                            db.dropCollection("dishes", (result) => {
                                console.log("Dropped Collection: ", result);
                            });
                        });
                      });
                    });
                  });
                }

MongoClient.connect(url, (err, client) => {

    assert.equal(err,null);

    console.log('Connected correctly to server');

    writeDishes(client.db('conFusion'), function(){
      db.close();
    });
});
