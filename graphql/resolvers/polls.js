const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Poll = require('../../models/Poll');
const { validateRegisterInput, validateLoginInput, validatePollCreation } = require('../../util/validators');
const {
    UserInputError, // Throw an error if empty fields.
    AuthenticationError,
    ValidationError
  } = require('apollo-server');
;


module.exports = {
    Mutation: {
        //async register(_, {registerInput : {username, email, password, confirmPassword}}) {
        async createPoll(_, {pollInput: {pollTitle, pollDescription, createdBy, Active, questions}}){
            const { errors, valid } = validatePollCreation(pollName,createdBy,createdAt,Active,pollDescription, questions);
            if (!valid) {
                throw new UserInputError('Error', { errors });
            }

        }
            
            
        
    },
    Query: {
        //user: (_, {ID}) => User.findById(ID)
        poll: (_,{ID}) => Poll.findById(ID)
    },
 };
