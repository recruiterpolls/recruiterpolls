const mongodb = require('mongodb');
const Poll = require('../../models/Poll');
//const pollResponse = require('../../models/PollResponse');
const { validatePollCreation, validatePollResponse } = require('../../util/validators');
const {
    UserInputError, // Throw an error if empty fields.
    AuthenticationError,
    ValidationError
  } = require('apollo-server');
const PollResponse = require('../../models/PollResponse');
const users = require('./users');
const User = require('../../models/User');
;


module.exports = {
    
    Mutation: {
        //async register(_, {registerInput : {username, email, password, confirmPassword}}) {
            //                           "title","desc stuf", "createdBy", True, "[{question1object}, {question2object}, {question3object}]"
        async createPoll(_, {createPollInput: {title, description, createdBy, active, questions, email}}){
         
            const{errors, valid} = validatePollCreation(title, JSON.parse(questions));
            
            if (!valid) {
                throw new UserInputError('Error', { errors });
            }

           //responses = ["A", "B", "fuckyouplaygound"];

            const newPoll = new Poll({
                title,
                description,
                createdAt: new Date().toISOString(),
                createdBy,
                active,
                questions,
                email
                //responses: []
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
            console.log(responses);
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
            //responses = ["A", "B", "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged."];
            console.log(responses);
            responses = JSON.parse(responses);
            console.log(JSON.stringify(responses));
            console.log("CREATING RESPONSE HERE");
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
            console.log(id);
        
       // }//, async getAllPollResponses(_, {id}){
           // const res = await PollResponse
        }, async getPollByID(_, {id}){
            const res = await Poll.findOne({_id: new mongodb.ObjectID(id)});

            return{
                id: res.id,
                ...res._doc
            };
        }, async getPollByUser(_, {email}){
            const res = await Poll.find({email});
            console.log(res);
            
            return res;
            
        }
        
    },

    Query: {
        poll: (_,{id}) => Poll.findOne({_id: new mongodb.ObjectID(id)})
    },
 };





 /*
mutation {
  createPollResponse(
 			id:"60b801ea6097ac34c01f25d7"
      name: "test response",
      email: "clout.chaser@gmail.com",
      "\"responses: \"{\"[\"a\", \"b\", \"C\"]\"}\"\""
      
  ) {
    name
   	email
    responses
  }
}


mutation {
  getPollByID(
    
     id: "60b801ea6097ac34c01f25d7"
    
  ) {
		id
    title
    description
    createdBy
    active
    questions
    responses{
      name
      email
      responses
    }
    
  }
}





 */