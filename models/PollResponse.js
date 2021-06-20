const { model, Schema } = require('mongoose');


const pollResponseSchema = new Schema({
    name: String,
    email: String,
    createdAt: String,
    responses: Array,
    rejected: Boolean,
    watchlisted: Boolean,

});








module.exports = model('PollResponse', pollResponseSchema);