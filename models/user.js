const mongoose = require("mongoose");
var userSchema = mongoose.Schema({
nom:{
type:String,
required:"nom is required"
},
prenom:{
type:String,
required:"prenom is required"
},
email:{
type:String,
required:"Email is required",
unique:true
} ,
password:{
type:String,
required:"password is required"
}
}
);
module.exports = mongoose.model('user', userSchema)