var db = require('../helper/db');
var ObjectId = require('mongodb').ObjectID;
var Ajv = require('ajv');
var AjvResponseHandler = require('ajv-response-handler');
var userSchemas = require('../schemas/user');

var ajv = new Ajv({allErrors:true, removeAdditional: true, format: 'full'});

var userSchema = ajv.compile(userSchemas.getSchema());
var UserInsertSchema = ajv.compile(userSchemas.getInsertSchema());
var UserUpdateSchema = ajv.compile(userSchemas.getUpdateSchema());

function validate(data){
    var valid = userSchema(data);
    if (!valid)
        return AjvResponseHandler.formatError(userSchema.errors, userSchemas.getSchema());
    return true;
 }

/**
 * 
 * Schema validation
 * unique validation
 */
async function insertValidation(data, unique = true){
    var post_data = Object.assign({}, data);;
    var valid = UserInsertSchema(data);
    if (!valid){
        console.log(UserInsertSchema.errors);
        return AjvResponseHandler.formatError(UserInsertSchema.errors, userSchemas.getInsertSchema());
    }
    
    if(unique === false)
        return true;

    var docs = await db.get().collection('users').findOne({username:data.username});
    if(docs){
        return ([{'message':'Username is already exists'}])
    }
    return true;
}

/**
 * 
 * Schema validation
 * unique validation
 */ 
async function modifyValidation(data, unique = true){
    var valid = UserUpdateSchema(data);
    if (!valid)
        return UserUpdateSchema.errors;

    if(unique === false)
        return true;

    data._id = ObjectId(data._id);
    var docs = await db.get().collection('users').findOne({_id:  { $ne: data._id}, username:data.username});
    if(docs){
        return ([{'message':'Username is already existss'}]);
    }
    return true;
}

 exports.validate = validate;
 exports.insertValidation = insertValidation;
 exports.modifyValidation = modifyValidation;