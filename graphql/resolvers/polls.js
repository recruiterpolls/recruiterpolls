
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
            //                           "title","desc stuf", "createdBy", True, "[{question1object}, {question2object}, {question3object}]"
        async createPoll(_, {createPollInput: {title, description, createdBy, active, questions}}){
         
            console.log("1"); 
            const{errors, valid} = validatePollCreation(title, JSON.parse(questions));
            
            if (!valid) {
                throw new UserInputError('Error', { errors });
            }
            console.log("2");
            const newPoll = new Poll({
                title,
                description,
                //createdAt: new Date().toISOString(),
                createdBy,
                active,
                questions
            });
            console.log("3");
            const res = await newPoll.save();
            console.log(res);
            console.log("4");
            return{
                id: res.id,
                ...res._doc
                
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
