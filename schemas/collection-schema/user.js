var schema = {
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