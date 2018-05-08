var mongoose = require('mongoose');
var bcrypt = require('bcrypt';)

let Schema = mongoose.Schema;

let adminUserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    schoolImageUrl: {
        type: String
    }
});


module.exports = mongoose.model('AdminUser', adminUserSchema);
