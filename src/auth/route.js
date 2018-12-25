const AuthController = require('./controller');
const router         = require('express').Router();

router.post('/login', AuthController.login);

module.exports = router;

