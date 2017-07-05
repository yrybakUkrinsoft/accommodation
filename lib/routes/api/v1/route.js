const router = require('express').Router();

const Controller = require('./controller');

module.exports = router;
router.get('/average', Controller.average);
router.get('/review', Controller.review);