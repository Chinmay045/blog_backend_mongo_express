const express = require('express');
const { getAllUsers, signUp, login } = require('../controllers/user-controller');

const router = express.Router();

router.get('/', getAllUsers);
router.post('/signUp', signUp)
router.post('/login', login)

module.exports = router;