var users = require('../services/userService');

exports.getUsers = async function(req, res) {
    users.findAll().then(data => res.json(data)).catch(err => res.send(err));
};

exports.getUser = async function(req, res) {
    users.findById(req.params.id)
    .then(data => res.json(data))
    .catch(err => res.json({errors:err}));
};

exports.addUser = function(req, res) {
    var data = req.body;
    users.insert(data)
    .then(data => res.json(data))
    .catch(err => res.json({errors:err}));
};

exports.uploadUser = function(req, res) {

    var data = req.body.data;
    users.bulkinsert(data)
    .then(data => res.json(data))
    .catch(err => res.json({errors:err}));
};

exports.updateUser = async function(req, res) {
    var data = {
        username: req.body.username
    }
    users.modify(req.params.id, data)
    .then(data => res.json(data))
    .catch(err => res.json({errors:err}));
};

exports.deleteUser = async function(req, res) {
    users.removeById(req.params.id)
    .then(data => res.json(data))
    .catch(err => res.json({errors:err}));
};

exports.updatePassword = function(req, res) {
    users.modifyPassword(req.params.id, req.body.password, req.body.current_password)
    .then(data => res.json(data))
    .catch(err => res.json({errors:err}));   
};