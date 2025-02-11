exports.getSchema = function(){
    return {
        "properties": {
            "_id": {
                "$id": "#/properties/_id",
                "type": "string",
                "minLength": 24,
                "maxLength": 24,
                "pattern": "^[0-9a-fA-F]{24}$"
            },
            "username": {
                "$id": "#/properties/username",
                "type": "string",
                "minLength": 5,
                "maxLength": 15,
                "pattern": "^[a-z0-9_-]*$"
            },
            "password": {
                "$id": "#/properties/password",
                "type": "string",
                "minLength": 5,
                "maxLength": 15,
                "pattern": "^[a-z0-9_-]*$"
            },
            "current_password": {
                "$id": "#/properties/current_password",
                "type": "string",
                "minLength": 5,
                "maxLength": 15,
                "pattern": "^[a-z0-9_-]*$"
            }
        },
        "$id": "user-default-schema#",
        "type": "object",
        "definitions": {},
        "$schema": "http://json-schema.org/draft-07/schema#"
    }
}

exports.getInsertSchema = function(){
    return {
        "required": [
            "username",
            "password",
            "email",
            "dob",
            "gender",
            "createdon",
            "phone"
        ],
        "properties": {
            "_id": {
                "$id": "#/properties/_id",
                "type": "string",
                "minLength": 24,
                "maxLength": 24,
                "pattern": "^[0-9a-fA-F]{24}$"
            },
            "username": {
                "$id": "#/properties/username",
                "type": "string",
                "minLength": 5,
                "maxLength": 15,
                "pattern": "^[a-z0-9_-]*$"            },
            "password": {
                "$id": "#/properties/password",
                "type": "string",
                "minLength": 5,
                "maxLength": 15,
                "pattern": "^[a-z0-9_-]*$"
            },
            "email": {
                "$id": "#/properties/email",
                "type": "string",
                "format": "email"
            },
            "dob": {
                "$id": "#/properties/dob",
                "type": "string",
                "format": "date"
            },
            "phone": {
                "$id": "#/properties/phone",
                "type": "string",
                "pattern": "^[0-9]{10}$"
            },
            "gender": {
                "$id": "#/properties/gender",
                "enum": ["female", "male"]
            },
            "age": {
                "$id": "#/properties/age",
                "type": "integer",
                "minimum": 1,
                "maximum": 1000,
                "if": { "minimum": 100 },
                "then": { "multipleOf": 100 },
                "else": {
                    "if": { "minimum": 10 },
                    "then": { "multipleOf": 10 }
                }
            },
            "createdon": {
                "$id": "#/properties/createdon",
                "type": "string",
                "format": "date-time"
            },
            "deleted":{ 
                "$id": "#/properties/deleted",
                "type": "string", 
                "default": "0"
            },
            "additionalProperties":false
        },
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
            "username"
        ],
        "properties": {
            "_id": {
                "$id": "#/properties/_id",
                "type": "string",
                "pattern": "^[0-9a-fA-F]{24}$"
            },
            "username": {
                "$id": "#/properties/username",
                "type": "string",
                "minLength": 5,
                "maxLength": 15,
                "pattern": "^[a-z0-9_-]*$"
            }
        },
        "$id": "user-update-schema#",
        "type": "object",
        "definitions": {},
        "$schema": "http://json-schema.org/draft-07/schema#"
    }
}