const UserController  = require('./controller');
const { Router }      = require('express');
const { verifyToken } = require('../middlewares/auth');
const router          = Router();

router.get('/', verifyToken, UserController.index);
router.get('/:id', verifyToken, UserController.show);
router.put('/:id', verifyToken, UserController.update);
router.delete('/:id', verifyToken, UserController.destroy);

module.exports = router;
