const { model, Schema } = require('mongoose');


const questionSchema = new Schema({
    title: String,
    description: String,
    questionType: String,
    required: Boolean,
    options: Array
});


module.exports = model('PollQuestion', questionSchema);