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
    questions: String!                  #questions should be array
    responses: [PollResponse]
    email: String!
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
    createdAT: String
    email: String!

}

type Query {
    user(id: ID!): User
    poll(id: String!): Poll
}

type Mutation {
    register(registerInput: RegisterInput): User!
    login(loginInput: LoginInput): User!
    createPoll(createPollInput: CreatePollInput): Poll!
    createPollResponse(id:String, name: String, email:String, responses: String): PollResponse
    deletePoll(id:String!): Poll
    deletePollResponse(id:String!): Poll
    getPollByID(id:String!): Poll
    getPollByUser(email: String!): [Poll]
}
`