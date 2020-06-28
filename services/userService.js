var db = require('../helper/db');
var ObjectId = require('mongodb').ObjectID;
var bcrypt = require('bcrypt');
const SALT_ROUNDS = 10

exports.findAll = async function(){
    var docs = await db.get().collection('users').find().toArray();
    return docs;
}

exports.findById = async function(id){
    var docs = await db.get().collection('users').find({_id: ObjectId(id)}).toArray();
    return docs;
}

exports.findByUsername = async function(username){
    var docs = await db.get().collection('users').find({username:username}).toArray();
    return docs;
}

exports.insert = async function(data){
    data.password = await encryptPassword(data.password);
    var docs = await db.get().collection('users').insertOne(data);
    return {docs};
}

exports.modify = async function(id, data){
    if(data.password !== undefined && data.password !== ''){
        data.password = await encryptPassword(data.password);
    }
    var docs = await db.get().collection('users').updateOne({_id: ObjectId(id)}, {$set:data});
    return docs;
}

exports.removeById = async function(id){
    var docs = await db.get().collection('users').deleteOne({_id:ObjectId(id)});
    return docs;
}

exports.verifyPassword = async function(password, dbpassword){
    return await comparePassword(password, dbpassword);
}

function encryptPassword(password){
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, SALT_ROUNDS, function(err, hash) {
            if(err)
                reject(err)
            resolve(hash);
        });
    });
}

function comparePassword(password, dbpassword){
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, dbpassword, function(err, hash) {
            if(err){
                reject();
            }
            resolve();
        });
    }).then(function(result){
        return true;
    }).catch(function(error){
        return false;
    });
}