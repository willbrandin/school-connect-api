var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

let Schema = mongoose.Schema;

let adminUserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  // name: {
  //   type: String,
  //   required: true
  // }, 
  password: {
    type: String,
    required: true
  },
  schoolImageUrl: {
    type: String
  }
});

adminUserSchema.pre('save', async function(next){
  try {
    if(!this.isModified('password')){
      return next();
    }
    let hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword
    return next();
  } catch(err){
    return next(err);
  }
});

adminUserSchema.methods.comparePassword = async function(candidatePassword, next){
  try {
    let isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch
  } catch(err){
    return next(err);
  }
}

module.exports = mongoose.model('AdminUser', adminUserSchema);
