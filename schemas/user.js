var schema = require('./collection-schema/user');

exports.getSchema = function(){
    return {
        "properties": schema,
        "$id": "user-default-schema#",
        "type": "object",
        "definitions": {},
        "$schema": "http://json-schema.org/draft-07/schema#"
    };
}

exports.getInsertSchema = function(){
    return {
        "required": [
            "username",
            "password",
            "email",
            "dob",
            "gender",
            "faq"
        ],
        "properties": schema,
        "$id": "user-insert-schema#",
        "type": "object",
        "definitions": {},
        "additionalProperties":false,
        "$schema": "http://json-schema.org/draft-07/schema#"
    }
}

exports.getUpdateSchema = function(){
    return {
        "required": [
            "_id",
            "username",
            "password",
            "email",
            "dob",
            "gender",
            "faq"
        ],
        "properties": schema,
        "$id": "user-update-schema#",
        "type": "object",
        "definitions": {},
        "$schema": "http://json-schema.org/draft-07/schema#"
    }
}

exports.beforeSave = function(){

}