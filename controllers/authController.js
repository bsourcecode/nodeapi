var authService = require('../services/authService');

exports.authentication = async function(req, res, next){
    return authService.authenticate(req, res);
}