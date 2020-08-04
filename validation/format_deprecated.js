function formatErrors(errors, schema){
    var err = [];
    errors.forEach(element =>{
        var resonse_json = {};        
        resonse_json.field = getField(element);
        resonse_json.name=  getText(element, schema);
        resonse_json.message = formatMessage(element['message'], resonse_json.name, element['params']);
        err.push(resonse_json);            
    });
    return err;
}

function validData(data, schema){
    var valid_data = {};
    for(var element in data){
        if(schema['properties'][element] !== undefined){
            if(typeof data[element] == 'string'){
                if(data[element].trim().length > 0){
                    valid_data[element] = data[element].trim();
                    if(schema['properties'][element]['type'] !== undefined && schema['properties'][element]['type'] == 'integer'){
                        valid_data[element] = parseInt(valid_data[element]);
                    }
                }
            }else if(schema['properties'][element]['type'] == 'object' && data[element]){
                for (key in data[element]) {
                    if(typeof data[element][key] == 'string'){
                        if(data[element][key].trim().length > 0){
                            if(valid_data[element] == undefined){
                                valid_data[element] = {};
                            }
                            valid_data[element][key] = data[element][key].trim();
                            if(schema['properties'][element]['properties'][key]['type'] !== undefined 
                            && schema['properties'][element]['properties'][key]['type'] == 'integer'){
                                valid_data[element][key] = parseInt(valid_data[element][key]);
                            }
                        }
                    }else{
                        valid_data[element] = data[element];
                    }
                }
            }else{
                valid_data[element] = data[element];
            }
        }
    }
    return valid_data;
}

function getField(element){
    var field = [];
    var temp ;
    temp = element['dataPath'].replace('.', '');
    field.push(temp);
    var temp = element['params']['missingProperty'] !=undefined ? element['params']['missingProperty']:'';
    field.push(temp);
    field.filter(el => el);
    field = field.join(".");
    return field;
}

function getText(element, schema){
    var schemaPath = element['schemaPath'];
    var params = element['params'];

    var new_schema = Object.assign({}, schema);;
    var schemaPath = schemaPath.split('/');
    schemaPath.shift();
    schemaPath.shift();
    if(params['missingProperty'] != undefined){
        if(schemaPath.length){
            schemaPath.pop();
            schemaPath.push('properties');
        }
        schemaPath.push(params['missingProperty']);
    }
    var text = '';
    for(var j = 0; j < schemaPath.length; j++){
        if(new_schema[schemaPath[j]] != undefined){
            new_schema = new_schema[schemaPath[j]];
            text = new_schema.text == undefined ? text : new_schema.text;
        }
    }
    return text;
}

function formatMessage(message, name, params = {}){
    if(params['missingProperty'] != undefined){
        message = message.replace("'"+params['missingProperty']+"'", '');
    }
    $text = name+' '+message;
    return $text.trim();
}

exports.formatErrors = formatErrors;
exports.validData = validData;