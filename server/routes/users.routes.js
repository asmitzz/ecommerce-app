const express = require('express');
const router = express.Router();

const { signup,login,signout,checkAuth,protected } = require('../controllers/users.controllers.js')

router.post('/users/signup',signup);
router.post('/users/login',login);
router.post('/users/signout',signout);
router.post('/users/protected',checkAuth,protected);

module.exports = router;