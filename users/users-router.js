const router = require('express').Router();

const Stylists = require('./users-model.js');
const Reviews = require('./reviews-model.js')
const restricted = require('../auth/restricted-middleware.js');

const validatePost = require('../auth/middleware/validatePost.js');
const validateUserId = require('../auth/middleware/validateUserId.js');

//GET stylists
router.get('/',  (req, res) => {
  Stylists.find()
      .then(users => {
        res.json(users);
      })
      .catch(err => res.send(err));
  });

  
  //GET stylists by id
  router.get('/:id',validateUserId, (req, res) => {
    res.status(200).json(req.user)
    });

  
  //POST a description  (stylists post)
  router.post('/:id/description', validateUserId, validatePost, (req, res) => {
    const newObj = {...req.body, userId: req.params.id}
    Stylists.insert(newObj)
    .then(post => {
    res.status(200).json(post) 
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({message: "There was an error adding the description"})
        })
  });


  //PUT request
  router.put('/:id', validateUserId, (req, res) => {
    const id = req.params.id
    
    Stylists.update(id, req.body)
    .then(updated => {
     if (updated) {
     Stylists.getById(id) 
     .then(userId => {
    res.status(200).json(userId)
     }) 
     }
    res.status(200).json(updated)    
    })
    .catch(err => {
    console.log(err);
    res.status(500).json({message: "There was an error updating this record"})
  })
  
});

//DELETE request
router.delete('/:id',validateUserId, (req, res) => {
  const id = req.params.id
  Stylists.remove(id)
  .then(deleted => {
  res.status(200).json(deleted)    
  })
  .catch(err => {
   console.log(err);
  res.status(500).json({message: "There was an error deleting this record"})
       })
  });
  
  

module.exports = router;