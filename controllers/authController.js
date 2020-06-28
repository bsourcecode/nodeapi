var authService = require('../services/authService');

exports.authentication = async function(req, res, next){
    var response = await authService.authenticate(req, res);
    res.json(response);
}