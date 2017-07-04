const router = require('express').Router();

const v1Router = require('./v1/route');

module.exports = router;
router.use('/v1', v1Router)