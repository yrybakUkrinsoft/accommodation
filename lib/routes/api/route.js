const router = require('express').Router();

const Controller = require('./controller');

module.exports = router;

router.get('/general', Controller.general);