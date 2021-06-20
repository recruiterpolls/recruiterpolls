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
    createdBy: String                         #createdBy: User
    active: Boolean!
    createdAt: String!
    questions: [PollQuestion]                  #questions should be array
    responses: [PollResponse]
    email: String!
   
}

type PollQuestion {
    title: String
    description: String
    questionType: String
    required: Boolean
    options: [String]
    checkedArray: [Int]
}

type PollResponse {
    id: ID!
    name: String
    email: String
    createdAt: String
    responses: [String]
    watchlisted: Boolean
    rejected: Boolean
 
   # responseCount: [String]

}


input RegisterInput {
    email: String!
    password: String!
    confirmPassword: String!
}
input LoginInput {
    email: String!
    password: String!
}

input VericationInput{
    email: String!
    password: String!
    isVerified:Boolean
}

input CreatePollInput {
    title: String 
    description: String
    createdBy: String
    active:Boolean
    questions: String
    createdAT: String
    email: String!

}

type Query {
    user(id: ID!): User
    poll(id: String!): Poll
    getPollsByEmail(email: String!): [Poll]
}

type Mutation {
    register(registerInput: RegisterInput): User!
    login(loginInput: LoginInput): User!
    createPoll(createPollInput: CreatePollInput): Poll!
    createPollResponse(id:String, name: String, email:String, responses: [String], checkedArray: [String]): PollResponse
    deletePoll(id:String!): Poll
    deletePollResponse(id:String!): Poll
    getPollByID(id:String!): Poll
    getPollByUser(email: String!): [Poll]
    setResponseWatchlisted(id:String!, setValue:Boolean): PollResponse
    setResponseRejected(responses:[String]! rejected:Boolean!, setValue:Boolean): ID
    verifyEmail(vericationInput:VericationInput): User!
}
`