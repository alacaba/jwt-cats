const AuthController = require('./controller');
const router         = require('express').Router();
const { verifyToken } = require('../middlewares/auth');

router.post('/login', AuthController.login);
router.delete('/logout', verifyToken, AuthController.logout);

module.exports = router;

