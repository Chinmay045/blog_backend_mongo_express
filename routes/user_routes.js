const express = require('express');
const router = express.Router();
const { getAllUsers, signUp, login } = require('../controllers/user_controller.js');

router.get('/', getAllUsers)
router.post('/signUp', signUp)
router.post('/login', login)



module.exports = router;