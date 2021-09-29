const { Router } = require('express');
const AuthController = require('../controllers/Auth');

const router = Router();

router
    .post('/login', AuthController.login)
    .post('/signup', AuthController.signUp)
    .get('/logout', AuthController.logout)

module.exports = router;