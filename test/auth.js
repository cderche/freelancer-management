var chai      = require('chai')
var chaiHttp  = require('chai-http')
var server    = require('../app')
var should    = chai.should()

chai.use(chaiHttp)

describe('authentication', function() {
  it('should return page on /login GET', function(done) {
    chai.request(server)
      .get('/login')
      .end(function(err, res) {
        res.should.have.status(200)
        done()
      })
  })
  it('should authenticate a user on /login POST')
  // it('should return page on /signup GET')
  // it('should create a user on /signup POST')
})
