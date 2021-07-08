if (!global.hasOwnProperty('User')) {
  var bCrypt = require('bcrypt-nodejs');
  var mongoose = require('mongoose')

  var schema = new mongoose.Schema({
    username:             { type: String, required: true },
    password:             { type: String, required: true },
    email:                { type: String, required: true },
    telephone:            { type: String, required: true },
    first_name:           { type: String, required: true },
    middle_name:          String,
    last_name:            { type: String, required: true },
    passport_number:      { type: String, required: true },
    passport_issue_date:  { type: String, required: true },
    passport_expiry_date: { type: String, required: true },
    nationality:          { type: String, required: true },
    sex:                  { type: String, required: true, enum: ['Male', 'Female'] },
    date_of_birth:        { type: String, required: true },
    visa_number:          { type: String, required: true },
    visa_issuer:          { type: String, required: true },
    visa_issue_date:      { type: String, required: true },
    visa_expiry_date:     { type: String, required: true },
    bank_name:            { type: String, required: true },
    bank_account_number:  { type: String, required: true },
    bank_account_holder:  { type: String, required: true },
    agreeTerms:           { type: Boolean, required: true, default: false },
    verified:             { type: Boolean, required: true, default: false },
    reset_token:          String,
    reset_token_used:     Date,
  })

  // Instance methods
  schema.methods.generate_reset_token = function(cb) {
    var hat = require('hat');
    this.reset_token = hat()
    this.reset_token_used = null
    this.save(function(err) {
      cb(err)
    })
  }

  schema.methods.validate_password = function(password) {
    return bCrypt.compareSync(password, this.password);
  }

  // Model methods
  schema.statics.create_hash = function(input) {
    return bCrypt.hashSync(input, bCrypt.genSaltSync(10), null);
  }

  global.User = mongoose.model('Workforce', schema)

}

module.exports = global.User
