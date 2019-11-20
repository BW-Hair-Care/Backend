const request = require('supertest')

const server = require('../api/server.js');

const users = require('../users/users-router.js');

describe('server', function() {
describe('GET /', function() {
 it('should return 200 OK', function() {
 return request(server)
 .get('/')
 .then(res => {
   expect(res.status).toBe(200)  
   })
 });

 it('should return text response', function() {
  return request(server).get('/')
  .then(res => {
   expect(res.type).toMatch(/text/i)
  })
 });

})
})