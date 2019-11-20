
exports.up = function(knex) {
return knex.schema.createTable('pictures', pictures => {
 pictures.increments();

 pictures.integer('userId')
 .unsigned()
 .notNullable()
 .references('id')
 .inTable('users')
 .onDelete('CASCADE')
 .onUpdate('CASCADE')

 pictures.string('url', 255)
 .notNullable()

 
  }) 
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('pictures');  
};
