const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Users = require('../users/users-model.js');
const secrets = require('../config/secret.js');


router.post('/register', (req, res) => {
  //implement registration
  let user = req.body
  const hash = bcrypt.hashSync(user.password, 10)
  user.password = hash;

  

  Users.add(user)
  .then(saved => {
  res.status(201).json(saved)  
  })
  .catch(error => {
 res.status(500).json({message: "Unable to register user", err: error});
  });

});

router.post('/login', (req, res) => {
  // implement login
const { username, password } = req.body;
// let user = req.body

Users.findBy({ username })
      .first()
      .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
          const token = getJwtToken(user)
        
          return res.status(200).json({message: `Welcome ${user.username}!`,
            token
          });
        
        } else {
          res.status(401).json({ message: 'Invalid Credentials' });
        }
      })
      .catch(error => {
        res.status(500).json(error);
      });

});

function getJwtToken(user) {
  console.log("token user", user);
  const payload = {

    username: user.username,
    subject: user.id,

  }

  const options = {
   expiresIn: '8h' 
  }
  
  return jwt.sign(payload, secrets.jwtSecret, options)
}

module.exports = router;
