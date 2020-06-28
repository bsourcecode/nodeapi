var MongoClient = require('mongodb').MongoClient;
let dbClient;

exports.connect  = async function(settings, callback){
    await MongoClient.connect(settings.mongoUrl, {useUnifiedTopology: true}, function(err, client){
        if(err){
            return console.dir(err)
        }        
        dbClient = client.db(settings.mongoDB);
        console.log('db connected '+settings.mongoDB)
        callback()
    })
}

exports.get = function(){
    return dbClient;
}

exports.close = function(){
    dbClient.close();
}