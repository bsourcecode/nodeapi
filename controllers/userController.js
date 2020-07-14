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
    var data = {
        username: req.body.username,
        password: req.body.password
    }
    users.insert(data)
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
    users.findById(req.params.id)
    .then(user_doc => {
        if(!user_doc){
            res.json({errors: [{message:'Please enter valid details'}]});
        }
        users.verifyPassword(req.body.current_password, user_doc.data.password)
        .then(function(password_status){
            if(password_status){
                users.modifyPassword(req.params.id, req.body.password)
                .then(data => res.json(data))
                .catch(err => res.json({errors:err}));
            }else{
                res.json({errors: [{message:'Please enter exact current password'}]});
            }
        }).catch(err => {
            res.json({errors: [{message:'Please enter exact current password'}]});
        });        
    })
    .catch(err => res.json({errors:err}));    
};