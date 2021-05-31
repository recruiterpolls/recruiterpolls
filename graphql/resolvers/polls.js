const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Poll = require('../../models/Poll');
const { validatePollCreation, validatePollResponse } = require('../../util/validators');
const {
    UserInputError, // Throw an error if empty fields.
    AuthenticationError,
    ValidationError
  } = require('apollo-server');
;


module.exports = {
    
    Mutation: {
        //async register(_, {registerInput : {username, email, password, confirmPassword}}) {
        async createPoll(_, {pollInput: {title, description, createdBy, active, questions}}){
            const{errors, valid} = validatePollCreation(title, description, createdBy, active, json.stringify(questions));
            if(!valid) {
                throw new UserInputError('Error', { errors });
            }

            active = true;

            const newPoll = new Poll({
                title,
                description,
                createdAt: new Date().toISOString(),
                createdBy,
                questions
            });

            const res = await newPoll.save();
            const GetData = getData(newPoll);

            return{
                id: res.id,
                ...res._doc,
                title


            };

       /*
        }, async createPollResponse(_,{pollResponseInput: {responses}}){
            const{errors, valid} = validatePollResponse(responses);
            if(!valid) {
                throw new UserInputError('Error', { errors });
            }
        }, async createPollQuestions(_,{pollQuestionInput})
         */   
            
        }
    },

    Query: {
        poll: (_,{ID}) => Poll.findById(ID)
    },
 };
