const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const secret = require('../config/secret.js')

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {

    
    //check the token is valid
    jwt.verify(token, secret.jwtSecret, (err, decodedToken) => {
      if(err) {
      res.status(401).json({ message: 'Invalid Credentials' });   
      } else {
    
        req.decodedJwt = decodedToken;
        
       next()
      }
    })
     
  } else {
  res.status(401).json({ you: 'shall not pass!' });
  }
};