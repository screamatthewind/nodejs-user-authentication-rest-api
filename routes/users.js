var router = require('express').Router();
var bcrypt = require('bcryptjs');
var User = require('../models/user');
var jwt = require('jsonwebtoken');
var constants = require('../config/constants');

// create a new user
// example post { username: 'bob', email: 'bob@example.com', pwd: mypass }
router.post('/', (req, res) => {
    var user = new User({
        username: req.body.user.username,
        email: req.body.user.email,
        passhash: bcrypt.hashSync(req.body.user.pwd, 10)
    });

    user.save().then(

        (newuser) => {
            var sessionToken = jwt.sign({ data: newuser._id }, constants.JWT_SECRET, {expiresIn: 60 * 60 * 24});

           res.json({
               user: newuser,
               message: 'success',
               sessionnToken: sessionToken
           });
        },
        (err) => {
            res.send(500, err.message);
        }
    )
});

module.exports = router;