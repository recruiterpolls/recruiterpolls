const { gql } = require('apollo-server');

module.exports = gql`
type User {
    id: ID!
    email: String!
    token: String
    createdAt: String!
    password: String!
}
type Poll {
    id: ID!
    title: String!
    description: String!
    createdBy: String!
    active: Boolean!
    questions: String!
    #questions should be array
    #response should be array
    responses: [PollResponse]
}

type PollQuestion {
    title: String
    description: String
    questionType: String
    required: Boolean
    options: [String]
}

type PollResponse {
    name: String
    email: String
    responses: [String]
}


#input PollResponseInput {
 #   name: String!
  #  email: String!
    #response should be array
   # responses: String!
#}

input RegisterInput {
    password: String!
    confirmPassword: String!
    email: String!
}
input LoginInput {
    email: String!
    password: String!
}

input CreatePollInput {
    title: String 
    description: String
    createdBy: String
    active:Boolean
    questions: String

}


type Query {
    user(id: ID!): User
    poll(id: String!): Poll
}

type Mutation {
    register(registerInput: RegisterInput): User!
    login(loginInput: LoginInput): User!
    createPoll(createPollInput: CreatePollInput): Poll!
   # createPollResponse(pollResponseInput: PollResponseInput): Poll!
    createPollResponse(id:String, name: String, email:String, responses: [String]): PollResponse
    deletePoll(id:String!): Poll
    deletePollResponse(id:String!): Poll
}
`