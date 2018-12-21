const UserController = require('./controller');
const { Router } = require('express');
const router = Router();

router.get('/', UserController.index);

module.exports = router;
