const db = require('../database/dbConfig.js');

module.exports = {
    get,
    getById,
    insert,
    getUserReviews,
    update,
    remove,
  };
  
  function get() {
    return db('reviews') 
    .select('id', 'customerReview', 'StylistsId',)  
   }
  
  
  function getById(id) {
    return db('reviews')
      .where({ id })
      .first();
  }
  
  function insert(post) {
    console.log('inside review insert', post);
    return db('reviews')
      .insert(post, 'id', 'CustomerId', 'StylistsId')
      .then(ids => {
        return getById(ids[0]);
      });
  }

  function getUserReviews(userId) {
    return db('reviews as r')
      .join('users as u', 'u.id', 'r.CustomerId')
      .select('r.id', 'r.customerReview', 'u.username')
      .where('r.CustomerId', userId);
  }
  
  function update(id, changes) {
    return db('reviews')
      .where({ id })
      .update(changes);
  }
  
  function remove(id) {
    return db('reviews')
      .where('id', id)
      .del();
  }
  