const db = require('../database/dbConfig.js');

module.exports = {
    get,
    getById,
    insert,
    update,
    remove,
  };
  
  function get() {
    return db('reviews');
  }
  
  function getById(id) {
    return db('reviews')
      .where({ id })
      .first();
  }
  
  function insert(post) {
    return db('reviews')
      .insert(post)
      .then(ids => {
        return getById(ids[0]);
      });
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
  