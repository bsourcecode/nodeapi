var schema = {
    "required": [
        "username",
        "password",
        "email",
        "dob",
        "gender",
        "createdon"
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
            "pattern": "^[a-z0-9_-]*$",
            "text":"UserName"
        },
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
            "minLength": 8,
            "maxLength": 25,
            "format": "email"
        },
        "dob": {
            "$id": "#/properties/dob",
            "type": "string",
            "format": "date"
        },
        "gender": {
            "$id": "#/properties/gender",
            "enum": ["female", "male"]
        },
        "createdon": {
            "$id": "#/properties/createdon",
            "type": "string",
            "format": "date-time"
        }
    },
    "$id": "user-default-schema#",
    "type": "object",
    "definitions": {},
    "$schema": "http://json-schema.org/draft-07/schema#"
}