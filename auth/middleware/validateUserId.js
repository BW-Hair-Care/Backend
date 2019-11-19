const Users = require('../../users/users-model.js')

function validateUserId(req, res, next) {
    const id = req.params.id
    Users.findById(id)
    .then(user => {
     if (user) {
     req.user = user
     next()
     } else {
     res.status(400).json({message: "invalid user id" })   
     }
    })
    };

    module.exports = validateUserId;