const UserController = require('./controller');
const { Router }     = require('express');
const router         = Router();

router.get('/', UserController.index);
router.get('/:id', UserController.show);
router.put('/:id', UserController.update);
router.delete('/:id', UserController.destroy);

module.exports = router;
