const express = require('express');
const { getAllUsers, signUp } = require('../controllers/user-controller');

const router = express.Router();

router.get('/', getAllUsers);
router.post('/signUp', signUp)

module.exports = router;