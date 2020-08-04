var db = require('../helper/db');
var ObjectId = require('mongodb').ObjectID;
var Ajv = require('ajv');
var AjvResponseHandler = require('ajv-response-handler');
var userSchemas = require('../schemas/user');


var format = require('./format_deprecated');

var ajv = new Ajv({allErrors:true, removeAdditional: true});

//Extend to custom/db validation


ajv.addKeyword('idExists', {
    type: 'string',
    validate: function(schema, data){
        console.log("here", schema, data);
        return false;
    }
});

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
    console.log(data, post_data);
    if (!valid)
        return AjvResponseHandler.formatError(UserInsertSchema.errors, userSchemas.getInsertSchema());
    
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
        return ([{'message':'Username is already existss'}])
    }
    return true;
}


 exports.validate = validate;
 exports.insertValidation = insertValidation;
 exports.modifyValidation = modifyValidation;