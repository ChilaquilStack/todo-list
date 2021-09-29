const { check } = require('express-validator');
const TodoModel = require('../models/Todo');

module.exports = check('email')
.trim()
.isLength({min: 8})
.isEmail()
.withMessage('Must be a valid email')
.custom(async (email) => {
    const existUser = await TodoModel.find({email});
    if(existUser) throw new Error('Email in use');
});