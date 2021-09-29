const { Router } = require('express');
const UserContoller = require('../controllers/User');

const router = Router();

router
    .route('/')
    .get(UserContoller.index)

module.exports = router;