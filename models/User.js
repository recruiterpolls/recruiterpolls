const { model, Schema } = require('mongoose');

const userSchema = new Schema({
    password: String,
    email: String,
    createdAt: String,
    isVerified: Boolean 
});

module.exports = model('User', userSchema);