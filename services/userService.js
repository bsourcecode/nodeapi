var db = require('../helper/db');
var ObjectId = require('mongodb').ObjectID;
var bcrypt = require('bcrypt');
var Ajv = require('ajv');
var userSchema = require('../schemas/user');

var ajv = new Ajv({allErrors:true});
var UserInsertSchema = ajv.compile(userSchema.getSchema());
var UserUpdateSchema = ajv.compile(userSchema.getUpdateSchema());
var UserIdSchema = ajv.compile(userSchema.getIdSchema());
var UserUsernameSchema = ajv.compile(userSchema.getUsernameSchema());
var UserPasswordSchema = ajv.compile(userSchema.getPasswordSchema());

const SALT_ROUNDS = 10

async function findAll(){
    return await db.get().collection('users').find().toArray();
}

//findByID
async function findById(id){
    var response = findByIdValidation({_id:id});
    if(response === true){
        var docs = await db.get().collection('users').findOne({_id: ObjectId(id)});
        return docs ? {data:docs} : {};
    }
    throw response;
}

function findByIdValidation(data){
    var valid = UserIdSchema(data);
    if (!valid)
        return UserIdSchema.errors;
    return true;
}

 //findByUsername
async function findByUsername(username){
    var response = findByUsernameValidation({username:username});
    if(response === true)
        return await db.get().collection('users').findOne({username:username});
    throw response;
}

function findByUsernameValidation(data){
    var valid = UserUsernameSchema(data);
    if (!valid)
        return UserUsernameSchema.errors;
    return true;
 }

 //Insert
 async function insert(data){
    var response = insertValidation(data);
    if(response === true){
        data.password = await encryptPassword(data.password);
        var docs = await db.get().collection('users').insertOne(data);
        return docs ? {data:docs} : {};
    }
    throw response;
}

function insertValidation(data){
    var valid = UserInsertSchema(data);
    if (!valid)
        return UserInsertSchema.errors;
    return true;
}

//Modify
async function modify(id, data){
    var vdata = data;
    vdata._id = id;
    var response = modifyValidation(vdata);
    if(response === true){
        var docs = await db.get().collection('users').updateOne({_id: ObjectId(id)}, {$set:data});
        return docs ? {data:docs} : {};
    }
    throw response;
}

function modifyValidation(data){
    var valid = UserUpdateSchema(data);
    if (!valid)
        return UserUpdateSchema.errors;
    return true;
}

//Password update
async function modifyPassword(id, password){
    var vdata = {
        _id:id,
        password:password
    };
    var response = modifyPasswordValidation(vdata);
    if(response === true){
        var hash_password = await encryptPassword(password);
        var data = {
            password: hash_password
        }
        var docs = await db.get().collection('users').updateOne({_id: ObjectId(id)}, {$set:data});
        return docs ? {data:docs} : {};
    }
    throw response;
}

function modifyPasswordValidation(data){
    var valid = UserPasswordSchema(data);
    if (!valid)
        return UserPasswordSchema.errors;
    return true;
}

//Remove 
async function removeById(id){
    var response = findByIdValidation({_id:id});
    if(response === true){
        var docs = await db.get().collection('users').deleteOne({_id: ObjectId(id)});
        return docs ? {data:docs} : {};
    }
    throw response;
}

async function verifyPassword(password, dbpassword){
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, dbpassword, function(err, result) {
            if(err || result === false){
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


function encryptPassword(password){
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, SALT_ROUNDS, function(err, hash) {
            if(err)
                reject(err)
            resolve(hash);
        });
    });
}


exports.findAll = findAll;
exports.verifyPassword = verifyPassword;
exports.findById = findById;
//exports.findByIdValidation = findByIdValidation;
exports.findByUsername = findByUsername;
//exports.findByUsernameValidation = findByUsernameValidation;
exports.insert = insert;
//exports.insertValidation = insertValidation;
exports.modify = modify;
exports.modifyValidation = modifyValidation;
exports.removeById = removeById;

exports.modifyPassword = modifyPassword;
//exports.modifyPasswordValidation = modifyPasswordValidation;