const express = require('express');
const router = express.Router();

router.use('/users', require('./resources/users/user.router'));

module.exports = router;
