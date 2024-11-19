var express = require('express');
var router = express.Router();
const usersController = require('controller/userController.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.get('/allUsers', async (req, res) => {
  const users = await usersController.getUsers();
  res.send('respond with a resource');
});



module.exports = router;
