var db = require('../helper/db');
var ObjectId = require('mongodb').ObjectID;
var bcrypt = require('bcrypt');

var userValidation = require('../validation/userValidation');

const SALT_ROUNDS = 10

//Find by object 
async function findAll(data = {}){
    var response = userValidation.validate(data);    
    if(response === true){
        if ('_id' in data)
            data._id = ObjectId(data._id);
        var docs = await db.get().collection('users').find(data).toArray();
        return docs ? {data:docs} : [];
    }
    throw response;
}

async function findOne(data = {}){
    var response = userValidation.validate(data);
    if(response === true){
        if ('_id' in data)
            data._id = ObjectId(data._id);

        var docs = await db.get().collection('users').findOne(data);
        return docs ? {data:docs} : {};
    }
    throw response;
}

//findByID
async function findById(id){
    return await findOne({_id:id});
}

//findByUsername
async function findByUsername(username){
    return await findOne({username:username});
}

 //Insert
 async function insert(data){
    var response = await userValidation.insertValidation(data);
    if(response === true){
        data.password = await encryptPassword(data.password);
        var docs = await db.get().collection('users').insertOne(data);
        return docs ? {data:docs} : {};
    }
    throw response;
}

//Modify
async function modify(id, data){
    var vdata = data;
    vdata._id = id;
    var response = await userValidation.modifyValidation(vdata);
    if(response === true){
        var docs = await db.get().collection('users').updateOne({_id: ObjectId(id)}, {$set:data});
        return docs ? {data:docs} : {};
    }
    throw response;
}


//Password update
async function modifyPassword(id, password, current_password){
    var vdata = {
        _id:id,
        password:password,
        current_password: current_password
    };
    var response = userValidation.validate(vdata);
    if(response === true){
        var user_doc = await findOne({_id:id});
        if(user_doc && user_doc.data){
            var password_status = await verifyPassword(current_password, user_doc.data.password);
            if(password_status){
                var hash_password = await encryptPassword(password);
                var data = {
                    password: hash_password
                }
                var docs = await db.get().collection('users').updateOne({_id: ObjectId(id)}, {$set:data});
                return docs ? {data:docs} : {};
            }else{
                throw ([{message: 'Please enter exact current password'}]);
            }
        }else{
            throw ([{message:'User records is not found!'}]);
        }
    }
    throw response;
}

//Remove 
async function removeById(id){
    var response = userValidation.validate({_id:id});
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
exports.findByUsername = findByUsername;
exports.insert = insert;
exports.modify = modify;
exports.modifyPassword = modifyPassword;
exports.removeById = removeById;