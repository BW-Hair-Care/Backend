const router = require('express').Router();

const Stylists = require('./users-model.js');
const Reviews = require('./reviews-model.js')
const restricted = require('../auth/restricted-middleware.js');

const validatePost = require('../auth/middleware/validatePost.js');
const validateUserId = require('../auth/middleware/validateUserId.js');
const validateReview = require('../auth/middleware/validateReview.js');

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
  // router.post('/:id/description', validateUserId, validatePost, (req, res) => {
  //   const newObj = {...req.body, id: req.params.id}
  //   Stylists.update(newObj)
  //   .then(post => {
  //   res.status(200).json(post) 
  //   })
  //   .catch(err => {
  //     console.log(err);
  //     res.status(500).json({message: "There was an error adding the description"})
  //       })
  // });


  //PUT request add a desription to stylist's profile
  router.put('/:id', validateUserId, (req, res) => {
    const id = req.params.id
    
    Stylists.update(id, req.body)
    .then(updated => {
     if (updated) {
     Stylists.findById(id) 
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

//POST request to add a review to stylists profile
router.post('/:id/review', validateUserId, validateReview, (req, res) => {
  
  const newObj = {...req.body, CustomerId: req.params.id}
  
    Reviews.insert(newObj)
    .then(post => {
   res.status(200).json(post)   
   })
   .catch(err => {
   console.log(err);
   res.status(500).json({message: err})
  })
});

//GET stylists review
router.get('/:id/review',  (req, res) => {
  Reviews.get()
      .then(reviews => {
        res.json(reviews);
      })
      .catch(err => res.send(err));
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