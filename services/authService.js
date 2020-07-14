var jwt = require('jsonwebtoken');
var settings = require('../config').getConfig();
var users = require('../services/userService');

function authenticate(req, res, next){
    if(req.body.username === '' || req.body.password === ''){
        return res.json({message: 'Please enter valid user details'});
    }
    users.findByUsername(req.body.username)
    .then(user_doc => {
        if(user_doc){
            users.verifyPassword(req.body.password, user_doc.password)
            .then(function(password_status){
                if(password_status){
                    var token = jwt.sign({
                        data: {user_id:1, role:'admin'}
                    }, settings.secret_key, { expiresIn: settings.expiresIn });
                    return res.json({statusCode: 200, token: token });
                }else{
                    return res.json({errors: [{message:'Please enter valid credentials'}]});
                }
            })
            .catch(err => {
                return res.json({errors: [{message:'Please enter valid credentials'}]});
            });
        }else{
            return res.json({errors: [{message:'Please enter valid credentials'}]});
        }
    })
    .catch(err =>{
        return res.json({errors: [{message:'Please enter valid credentials'}]});
    });    
}

function verifyToken(req, res, next){
    var token = req.headers['x-access-token'];
    if(!token){
        return res.status(403).send({ statusCode:403, auth: false, message: 'Invalid token' });
    }

    jwt.verify(token, settings.secret_key, function(err, decoded) {
        if (err){
            return res.status(500).send({ statusCode:500, auth: false, message: 'Invalid token' });
        }

        req.session = decoded.data;
        next()
      });      
}

module.exports = {
    authenticate,
    verifyToken
};