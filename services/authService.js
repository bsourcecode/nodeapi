var jwt = require('jsonwebtoken');
var settings = require('../config').getConfig();
var users = require('../services/userService');

async function authenticate(req, res){
    //console.log(req.body)
    if(req.body.username == '' || req.body.password == ''){
        return {statusCode:400, message: 'Please enter valid user details'};
    }

    var user_doc =await users.findByUsername(req.body.username);
    console.log(user_doc)
    if(user_doc){
        console.log("user_doc", user_doc);
        var password_status = await users.verifyPassword(req.body.password, user_doc.password);
        if(password_status){
            var token = jwt.sign({
                data: {user_id:1, role:'admin'}
            }, settings.secret_key, { expiresIn: settings.expiresIn });
            return {statusCode: 200, message: 'Successfully logged in', token: token };
        }else{
            return {statusCode: 400, message: 'Please enter valid credentials' };
        }
    }else{
        return {statusCode: 400, message: 'Please enter valid credentials' };
    }
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