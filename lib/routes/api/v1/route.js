const router = require('express').Router();

const Controller = require('./controller');

module.exports = router;
router.get('/general', Controller.general);
router.get('/review', Controller.review);