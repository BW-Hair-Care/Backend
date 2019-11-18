
exports.up = function(knex) {
    return knex.schema.createTable('users', users => {
        users.increments();
   
        users.string('username', 128)
        .notNullable()
        .unique()
   
        users.string('email', 128)
        .notNullable()
        .unique()
   
        users.string('password', 128)
        .notNullable()

        users.string('location', 128)
        .notNullable()

        users.integer('userType', 128)
        .notNullable()

        users.string('description', 128)
        
    })     
};

exports.down = function(knex) {
return knex.schema.dropTableIfExists('users'); 
};
