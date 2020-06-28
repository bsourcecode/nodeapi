var express = require('express');
var router = express.Router();


//User controller
var CUserCtrl = require('../controllers/userController')

//User module (CRUD)
router.get('/', CUserCtrl.getUsers);

router.get('/:id', CUserCtrl.getUser);

router.post('/', CUserCtrl.addUser);

router.put('/:id', CUserCtrl.updateUser);

router.delete('/:id',  CUserCtrl.deleteUser);

/*router.patch('/:id', CUserCtrl.actionUpdate);*/

module.exports = router;