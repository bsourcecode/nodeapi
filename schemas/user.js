exports.getSchema = function(){
    return {
        "required": [
            "username",
            "password"            
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
                "pattern": "^[a-z0-9_-]*$"
            },
            "password": {
                "$id": "#/properties/password",
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

exports.getPasswordSchema = function(){
    return {
        "required": [
            "_id",
            "password"            
        ],
        "properties": {
            "_id": {
                "$id": "#/properties/_id",
                "type": "string",
                "minLength": 24,
                "maxLength": 24,
                "pattern": "^[0-9a-fA-F]{24}$"
            },
            "password": {
                "$id": "#/properties/password",
                "type": "string",
                "minLength": 5,
                "maxLength": 15,
                "pattern": "^[a-z0-9_-]*$"
            }
        },
        "$id": "user-password-schema#",
        "type": "object",
        "definitions": {},
        "$schema": "http://json-schema.org/draft-07/schema#"
    }
}

exports.getIdSchema = function(){
    return {
        "required": [
            "_id"
        ],
        "properties": {
            "_id": {
                "$id": "#/properties/_id",
                "type": "string",
                "minLength": 24,
                "maxLength": 24,
                "pattern": "^[0-9a-fA-F]*$"
            }
        },
        "$id": "user-id-schema#",
        "type": "object",
        "definitions": {},
        "$schema": "http://json-schema.org/draft-07/schema#"
    }
}

exports.getUsernameSchema = function(){
    return {
        "required": [
            "username"
        ],
        "properties": {
            "username": {
                "$id": "#/properties/username",
                "type": "string",
                "minLength": 5,
                "maxLength": 15,
                "pattern": "^[a-z0-9_-]*$"
            }
        },
        "$id": "user-username-schema#",
        "type": "object",
        "definitions": {},
        "$schema": "http://json-schema.org/draft-07/schema#"
    }
}