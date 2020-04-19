const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const User = require('../../models/User');

// @router    GET api/auth
// @desc      get user
// @access    Public
// adding a middleware makes it a private route
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @router    POST api/auth
// @desc      Authenticate user & get token
// @access    Public
router.post(
    '/', 
    [
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Password is required').exists()
    ], 
    async (req, res) => {
        // validate the requirements above
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Register user if validated
        const { email, password } = req.body;

        try {
            // See if user exists
            let user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ errors: [{msg: 'Invalid Credentials'}]});
            }

            const payload = {
                user: {
                    id: user.id
                }
            };

            // See if password match
            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.status(400).json({ errors: [{msg: 'Invalid Credentials'}]});
            }

            jwt.sign(
                payload, 
                config.get('jwtSecret'), 
                { expiresIn: 360000 }, 
                (err, token) => {
                    if (err) {
                        throw err;
                    }
                    res.json({ token });
                }
            );
            
        } catch(err) {
            console.error(err.message);
            res.status(500).send('Server error');
        } 
    }
);

module.exports = router;