const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://localhost:27017/conFusion';


const writeDishes = function(db, callback){
    const collection = db.collection("dishes");

    collection.insertOne({"name": "Uthappizza", "description": "test_0"},
    (err, result) => {
        assert.equal(err,null);

        console.log("After Insert:\n");
        console.log(result.ops);

        collection.find({}).toArray((err, docs) => {
            assert.equal(err,null);

            console.log("Found:\n");
            console.log(docs);

            db.dropCollection("dishes", (err, result) => {
                assert.equal(err,null);
            });
            callback;
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
