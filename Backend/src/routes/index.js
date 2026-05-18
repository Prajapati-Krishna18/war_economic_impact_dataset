const express = require('express');
const v1Routes = require('./v1');

const router = express.Router();

// Mount API version 1
router.use('/v1', v1Routes);

// Future versions (e.g. v2) will be mounted here
// router.use('/v2', v2Routes);

module.exports = router;
