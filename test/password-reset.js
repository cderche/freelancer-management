var chai      = require('chai')
var chaiHttp  = require('chai-http')
var chaiDom   = require('chai-dom')
var server    = require('.././app')
var should    = chai.should()
var mongoose  = require('mongoose')
var User      = require('.././models/user')
var Async     = require('async')

mongoose.connect(process.env.MONGODB_URI)
chai.use(chaiHttp)
chai.use(chaiDom)

describe('Password Reset', function() {

  before(function(done) {
    var basicUser = {
      // username:             'known@example.com',
      password:             'password',
      // email:                'known@example.com',
      telephone:            '123456789',
      first_name:           'John',
      middle_name:          'Mark',
      last_name:            'Doe',
      passport_number:      'PP123456',
      passport_issue_date:  '02/01/2010',
      passport_expiry_date: '01/01/2020',
      nationality:          'German',
      sex:                  'Male',
      date_of_birth:        '20/04/1988',
      visa_number:          'VN1234',
      visa_issuer:          'VisaHouse',
      visa_issue_date:      '25/06/2016',
      visa_expiry_date:     '24/06/2019',
      bank_name:            'OpenBank',
      bank_account_number:  'OB1234AN1234',
      bank_account_holder:  'John Doe',
      agreeTerms:           true,
      verified:             true
    }

    var users = [
      { username: 'u@1.com', email: 'u@1.com' },
      { username: 'u@2.com', email: 'u@2.com', reset_token: 'knownToken' },
      { username: 'u@3.com', email: 'u@3.com', reset_token: 'usedToken', reset_token_used: Date.now() },
    ]

    Async.each(users, function(data, cb) {
      Object.assign(data, basicUser)
      var user = new User(data)
      user.save(function(err) {
        cb()
      })
    },
    function(err) {
      done()
    })

  });

  after(function(done) {
    User.collection.drop(function(err) {
      done()
    })
  })

  it('should have 200 status on /forgot GET', function(done) {
    chai.request(server)
      .get('/forgot')
      .end(function(err, res) {
        res.should.have.status(200)
        done()
      })
  });

  it('should have 400 status if no data on /forgot POST', function(done) {
    chai.request(server)
      .post('/forgot')
      .end(function(err, res) {
        // console.log(res);
        res.should.have.status(400)
        done()
      })
  });

  it('should have 404 status if username unknown on /forgot POST', function(done) {
    chai.request(server)
      .post('/forgot')
      .send({ username: 'unknown@example.com'})
      .end(function(err, res) {
        res.should.have.status(404)
        done()
      })
  });

  it('should have 200 status if username known on /forget POST', function(done) {
    chai.request(server)
      .post('/forgot')
      .send({ username: 'u@1.com'})
      .end(function(err, res) {
        res.should.have.status(200)
        done()
      })
  });

  it('should have 200 status on /reset GET', function(done) {
    chai.request(server)
      .get('/reset')
      .end(function(err, res) {
        res.should.have.status(200)
        done()
      })
  });

  it('should have 400 status if no data on /reset POST', function(done) {
    chai.request(server)
      .post('/reset')
      .end(function(err, res) {
        res.should.have.status(400)
        done()
      })
  });

  it('should have 400 status if passwords do not match on /reset POST', function(done) {
    chai.request(server)
      .post('/reset')
      .send({
        password: 'password',
        password_confirmation: 'notidentical'
      })
      .end(function(err, res) {
        res.should.have.status(400)
        done()
      })
  });

  it('should have 403 status if token already used on /reset POST', function(done) {
    chai.request(server)
      .post('/reset')
      .send({
        password: 'password',
        password_confirmation: 'password',
        token: 'usedToken'
      })
      .end(function(err, res) {
        res.should.have.status(403)
        done()
      })
  });

  it('should have 404 status if token not found on /reset POST', function(done) {
    chai.request(server)
      .post('/reset')
      .send({
        password: 'password',
        password_confirmation: 'password',
        token: 'unknownToken'
      })
      .end(function(err, res) {
        res.should.have.status(404)
        done()
      })
  });

  it('should have 200 status if token valid and passwords match on /reset POST', function(done) {
    chai.request(server)
      .post('/reset')
      .send({
        password: 'password',
        password_confirmation: 'password',
        token: 'knownToken'
      })
      .end(function(err, res) {
        res.should.have.status(200)
        done()
      })
  });

});
