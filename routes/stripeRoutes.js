const express = require('express')
const router = express.Router();

const stripeController = require('../controllers/stripeController');

router.post('/subscribe', stripeController.Subscribe);
router.post('/unsubscribe', stripeController.Unsubscribe);
router.post('/update-subscribe', stripeController.UpdateSubscribe);

module.exports = router;