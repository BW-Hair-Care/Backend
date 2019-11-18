const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')


module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {

    
    //check the token is valid
    jwt.verify(token, process.env.JWT_SECRET || 'this is confidential', (err, decodedToken) => {
      if(err) {
      res.status(401).json({ message: 'Invalid Credentials' });   
      } else {
        req.user = decodedToken;
        
       next()
      }
    })
     
  } else {
  res.status(401).json({ you: 'shall not pass!' });
  }
};