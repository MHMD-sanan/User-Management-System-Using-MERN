const mongoose=require('mongoose');

const { Schema } = mongoose;
const userSchema = new Schema({
  name:  String,
  email: String,
  password:   String
});
//3rd make a model
const User = mongoose.model('User', userSchema);

module.exports=User;
