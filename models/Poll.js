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
    questions: String,
    responses: Array
});










module.exports = model('Poll', pollSchema);