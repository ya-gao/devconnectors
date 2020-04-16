// send token balck to authenticate to access the private routes
const jwt = require('jsonwebtoken');
const config = require('config');

// A middleware function is basically a function have access to request and response object, and 
//   next is a callback we have to run once we are done so that moves on to the nect middleware
module.exports = function(req, res, next) {
    // Get token from the Header
    const token = req.header('x-auth-token');

    // Check if no token
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    // Verify token
    try {
        const decoded = jwt.verify(token, config.get('jwtSecret'));
        req.user = decoded.user;
        next();
    } catch(err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
}