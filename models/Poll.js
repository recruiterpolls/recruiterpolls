const { introspectionFromSchema } = require('graphql');
const { model, Schema } = require('mongoose');

const pollSchema = new Schema({
    pollID: String,
    pollName: String,
    createdBy: String,
    createdAt: String
});











module.exports = model('Poll', pollSchema);