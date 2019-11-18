const db = require('../database/dbConfig.js');

module.exports = {
  get,
  add,
  find,
  findBy,
  findById,
//   getUserPosts,
  update,
  remove,
};

function get() {
return db('users');
}


async function add(user) {
console.log("inside add", user);
const [id] = await db('users').insert(user)
console.log(id);
return findById(id)
 }

 function find() {
  return db('users') 
  .select('id', 'username', 'password')  
 }

function findBy(filter) {
console.log("inside find by", filter);
return db('users') 
.where(filter) 
    }


function findById(id) {
    return db('users')
    .where({ id })
    .first(); 
    }


//     function getUserPosts(userId) {
//   return db('posts as p')
//     .join('users as u', 'u.id', 'p.user_id')
//     .select('p.id', 'p.text', 'u.name as postedBy')
//     .where('p.user_id', userId);
// }



function update(id, changes) {
  return db('users')
    .where({ id })
    .update(changes);
}

function remove(id) {
  return db('users')
    .where('id', id)
    .del();
}