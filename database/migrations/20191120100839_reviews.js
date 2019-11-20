
exports.up = function(knex) {
return knex.schema.createTable('reviews', reviews => {
reviews.increments();

reviews.string('customerReview', 255)
.notNullable()

reviews.integer('CustomerId')
.references('id')
.inTable('users')
 .onDelete('CASCADE')
 .onUpdate('CASCADE')

 reviews.integer('StylistsId')
.references('id')
.inTable('users')
 .onDelete('CASCADE')
 .onUpdate('CASCADE')
}) 
};

exports.down = function(knex) {
return knex.schema.dropTableIfExists('reviews');    
};
