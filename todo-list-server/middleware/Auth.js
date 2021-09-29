const jwt = require('jsonwebtoken');

const isLogin = (req, res, next) => {
    try {
        const bearerHeader = req.get('Authorization');
        if(!bearerHeader) throw new Error("Token is required");
        const bearer = bearerHeader.split(' ');
        const token = bearer[1];
        req.authUser = jwt.verify(token, process.env.SECRET_WORD);
        next();
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

module.exports = isLogin;