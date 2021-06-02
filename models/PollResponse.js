const { model, Schema } = require('mongoose');


const pollResponseSchema = new Schema({
    title: String,
    createdBy: String,
    responses: String

});








module.exports = model('PollResonse', pollResponseSchema);