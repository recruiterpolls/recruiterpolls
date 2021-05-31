const { model, Schema } = require('mongoose');
/*
const pollSchema = new Schema({
    title: String,
    createdBy: String,
    createdAt: String
});
*/

const pollSchema = new Schema({
    title: String,
    description: String,
    createdBy: String,
    active:Boolean,
    questions: String
});










module.exports = model('Poll', pollSchema);