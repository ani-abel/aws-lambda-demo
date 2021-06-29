const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({  
  firstName: String,
  lastName: String,
  age: Number,
  gender: String,
});
module.exports = mongoose.model('User', UserSchema);
