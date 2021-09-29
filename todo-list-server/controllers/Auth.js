const UserModel = require('../models/User');
const jwt = require('jsonwebtoken');

class AuthController {

    login = async (req, res) => {
        try {
            const result = await UserModel.authenticate(req.body);
            const token = await jwt.sign({id: result._id}, process.env.SECRET_WORD, {expiresIn: "1h"});
            res.status(200).json({token});
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    }

    logout(req, res) {
        sessionStorage.removeItem('token');
    }
    
    signUp = async(req, res) => {
        const newUser = await new UserModel(req.body);
        newUser.save();
        res.status(200).json({user: newUser})
    }

};

module.exports = new AuthController();