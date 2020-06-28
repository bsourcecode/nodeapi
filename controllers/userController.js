var users = require('../services/userService');

exports.getUsers = async function(req, res) {
    var docs = await users.findAll();
    res.status(200).json({statusCode:200, data: docs});
};

exports.getUser = async function(req, res) {
    var docs = await users.findById(req.params.id);
    res.status(200).json({statusCode:200, data: docs});
};

exports.addUser = async function(req, res) {
    var data = {
        username: req.body.username,
        password: req.body.password,
    }
    var docs = await users.insert(data);
    res.status(200).json({statusCode:200, data: docs});
};

exports.updateUser = async function(req, res) {
    var data = {        
        username: req.body.username,
        password: req.body.password,
    }
    var docs = await users.modify(req.params.id, data);
    res.status(200).json({statusCode:200, data: docs});
};

exports.deleteUser = async function(req, res) {
    var docs = await users.removeById(req.params.id);
    res.status(200).json({statusCode:200, data: docs});
};