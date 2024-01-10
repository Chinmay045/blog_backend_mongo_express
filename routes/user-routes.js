const express = require('express');
const getAllUsers = require('../controllers/user-controller');

const router = express.router();

router.get('/', getAllUsers);

module.exports = router;