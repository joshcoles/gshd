const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const keys = require('../../config/keys.js');

// Load input validation
const validateRegisterInput = require('../../validation/register.js');
const validateLoginInput = require('../../validation/login.js');

// Load User model
const User = require('../../models/User.js');

/*
 * @route POST /api/users/register
 * @desc Validates name, email and password. Creates User obj, hashes password then saves in DB.
 * --------------------------------------------
 */

router.post('/register', (req, res) => {

  const { errors, isValid } = validateRegisterInput(req.body);

  // Check that submission is valid
  if (!isValid) {
    return res.status(400).json(errors);
  } 

  // Check for a user with that email in the database
  User.findOne({email: req.body.email})
    .then((user) => {

      // Handle cases - User exists or does not yet exist
      if (user) {
        // Send error
        return res.status(400).json({email: 'An account with that email already exists'});

      } else {
        // Create new user object 
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password
        });
        
        // Hash password before saving in database
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
  
            newUser.password = hash;
            newUser
              .save()
              .then(user => res.json(user))
              .catch(err => console.log(err));
          });
        });
      } 
    });
});


/*
 * @route POST /api/users/login
 * @desc Validates name, email and password. Checks for user. Compares password with hashed password. Auth's and signs new JWT to expire in 1 year.
 * --------------------------------------------
 */

router.post('/login', (req, res) => {
    
  const { errors, isValid } = validateLoginInput(req.body);
  
  console.log(req.body);

  // Check that submission is valid
  if (!isValid) {
    return res.status(400).json(errors);
  }
  
  const email = req.body.email;
  const password = req.body.password;
  
  // Find user by email
  User.findOne({ email }).then(user => {

    // Check if user exists
    if (!user) {
      return res.status(404).json({ emailnotfound: 'Email not found' });
    }

    // Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // If user matched, create JWT Payload
        const payload = {
          id: user.id,
          name: user.name
        };

        // Sign token
        // Expires in 1 year in seconds
        jwt.sign(payload, keys.secretOrKey, {expiresIn: 31556926}, (err, token) => {

          res.json({
            success: true,
            token: 'Bearer', token
          });

        });
      } else {
        return res.status(400).json({ passwordincorrect: 'Password incorrect' });
      }
    });
  });
});

module.exports = router;
