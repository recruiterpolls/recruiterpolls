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
const PollQuestion = require('../../models/PollQuestion');



module.exports = {
    
    Mutation: {
        //async register(_, {registerInput : {username, email, password, confirmPassword}}) {
            //                           "title","desc stuf", "createdBy", True, "[{question1object}, {question2object}, {question3object}]"
        async createPoll(_, {createPollInput: {title, description, createdBy, active, questions, email}}){
            
            console.log("entered createpoll");
            console.log(questions);

            const{errors, valid} = validatePollCreation(title, JSON.parse(questions));
            
            if (!valid) {
                throw new UserInputError('Error', { errors });
            }

           //responses = ["A", "B", "fuckyouplaygound"];

           questions = JSON.parse(questions);
            /*
           for(var i = 0; i < questions.length; i++){
            console.log(questions[i]);
            }
            */

            const newPoll = new Poll({
                title,
                description,
                createdAt: new Date().toISOString(),
                createdBy,
                active,
                email
                //responses: []
            });


            const res = await newPoll.save();

            for(var i = 0; i < questions.length; i++){
                console.log(questions[i]);
                var newPollQuestion = new PollQuestion({
                    title:questions[i].title,
                    description:questions[i].description,
                    required:questions[i].required,
                    options:questions[i].options
                })


                var resolve = await newPollQuestion.save();
                Poll.findOneAndUpdate(
                    {_id: new mongodb.ObjectID(res.id)},
                    {$push: {questions: newPollQuestion}},
                    function(error, success){
                        if(error){
                            console.log(error);
                        }else{
                            console.log(success);
                        }
                    }
                );
            }

            console.log(resolve.questions);

            return{
                id: res.id,
                ...res._doc
            };
                
        
            
        }, async deletePoll(_, {id}){
            const res = await Poll.deleteOne({_id: new mongodb.ObjectID(id)});
            console.log(id);
        

         
        }, async createPollResponse(_, {id, name, email, responses}){ 
            
            /*
            const{errors, valid} = validatePollResponse(title, JSON.parse(responses));
            if(!valid) {
                throw new UserInputError('Error', { errors });
            }
                */
            console.log("IN");
            console.log(name);
            console.log(email);
            console.log(responses);
            const{errors, valid} = validatePollResponse(name, email, responses);
            
            if(!valid){
                console.log("user input error thrown");
                throw new UserInputError('Error', {errors});
            }
            //responses = ["A", "B", "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged."];
            console.log(responses);
            //responses = JSON.parse(responses);
            // var responsesArray = JSON.parse(responses);
            //console.log(JSON.parse(responses));
            console.log("CREATING RESPONSE HERE");


           // const newPollReponse = {name:name, email:email, responses:responses, watchlisted:false, rejected:false}

           const newPollResponse = new PollResponse({
                name,
                email,
                createdAt: new Date().toISOString(),
                responses: [...responses],//: JSON.parse(responses),
                rejected: false,
                watchlisted: false
            });
            console.log(responses);
            const res = await newPollResponse.save();

            Poll.findOneAndUpdate(
                {_id: new mongodb.ObjectID(id)},
                {$push: {responses: newPollResponse}},
                function(error, success){
                    if(error){
                        console.log(error);
                    }else{
                        console.log(success);
                    }
                }
            );
            

            return{
                id: res.id,
                ...res._doc
            };
    
            //return newPollReponse;

        
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
            
       }, async setResponseWatchlisted(_, {id, setValue}){

            PollResponse.findOneAndUpdate({_id: new mongodb.ObjectID(id)}, {$set:{watchlisted:true}}, {new: true}, (error,doc) => {
                if(error) {
                    console.log("something went wrong")
                }
                    console.log(doc)
                    return doc;
            });

            
                                                    //come back to setResponseRejected and setResponseWatchlisted                                                    
            
            //return getPollByUser(email);
        }, async setResponseRejected(_, {id, email, rejected, setValue}){
            rejected = setValue;
        }//, async getUserByResponse
        
    },

    Query: {
        poll: (_,{id}) => Poll.findOne({_id: new mongodb.ObjectID(id)})
        , 
        async getPollsByEmail(_, {email}) {
            const res = await Poll.find({email});
            console.log(res);
            return res;
        }
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