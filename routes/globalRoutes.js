const express = require('express')
const router = express.Router();

const globalController = require('../controllers/globalController');

router.get('/hom', globalController.getHome);
router.put('/', globalController.updateElement);
router.delete('/', globalController.deleteElement);

module.exports = router;