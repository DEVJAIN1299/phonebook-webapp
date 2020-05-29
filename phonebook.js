var mongoose = require("mongoose");

var PhoneBookSchema = mongoose.Schema({
 name: String,
 phoneNo: String,
 email: String,
 DoB: String 
});



module.exports = mongoose.model("phoneBook", PhoneBookSchema);