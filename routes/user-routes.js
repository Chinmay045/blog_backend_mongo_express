const express = require('express');
const getAllUsers = require('../controllers/user-controller');

const router = express.Router();

router.get('/', getAllUsers.getAllUsers);
router.post('/signUp', getAllUsers.signUp)

module.exports = router;