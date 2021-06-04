const mongodb = require('mongodb');
const Poll = require('../../models/Poll');
const pollResponse = require('../../models/PollResponse');
const { validatePollCreation, validatePollResponse } = require('../../util/validators');
const {
    UserInputError, // Throw an error if empty fields.
    AuthenticationError,
    ValidationError
  } = require('apollo-server');
const PollResponse = require('../../models/PollResponse');
;


module.exports = {
    
    Mutation: {
        //async register(_, {registerInput : {username, email, password, confirmPassword}}) {
            //                           "title","desc stuf", "createdBy", True, "[{question1object}, {question2object}, {question3object}]"
        async createPoll(_, {createPollInput: {title, description, createdBy, active, questions}}){
         
            const{errors, valid} = validatePollCreation(title, JSON.parse(questions));
            
            if (!valid) {
                throw new UserInputError('Error', { errors });
            }

            const newPoll = new Poll({
                title,
                description,
                //createdAt: new Date().toISOString(),
                createdBy,
                active,
                questions,
                responses: []
            });

            const res = await newPoll.save();

            return{
                id: res.id,
                ...res._doc
            };
                
        
            
        }, async deletePoll(_, {id}){
            const res = await Poll.deleteOne({_id: new mongodb.ObjectID(id)});
            console.log(id);
        

         
        }, async createPollResponse(parent, {id, name, email, responses}){
            console.log(parent);
            /*
            const{errors, valid} = validatePollResponse(title, JSON.parse(responses));
            if(!valid) {
                throw new UserInputError('Error', { errors });
            }
                */
            const{errors, valid} = validatePollResponse(name, email, JSON.parse(responses));
            if(!valid){
                throw new UserInputError('Error', {errors});
            }
          // responses = ["A", "B", "fuckyouplaygound"];
           const newPollReponse = {name:name, email:email, responses:responses}
           Poll.findOneAndUpdate(
                {_id: new mongodb.ObjectID(id)},
                {$push: {responses: newPollReponse}},
                function(error, success){
                    if(error){
                        console.log(error);
                    }else{
                        console.log(success);
                    }
                }
            );
            

            return newPollReponse;


        }, async deletePollResponse(_, {id}){
            //dont need to set to value res
            const res = await PollResponse.deleteOne({
                _id: new mongodb.ObjectID(id)
            });
            console.log(id)
        }
        
        //, async createPollQuestions(_,{pollQuestionInput})
      

    },

    Query: {
        poll: (_,{id}) => Poll.findOne({_id: new mongodb.ObjectID(id)})
    },
 };
