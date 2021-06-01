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
    #responses: String
}

type PollQuestion {
    title: String
    description: String
    questionType: String
    required: Boolean
    options: [String]
}

type PollResponse {
    name: String!
    email: String!
    response: [String]
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

}

input createPollResponseInput {
    responses: [String]!
}

type Query {
    user(id: ID!): User
    poll(id: ID!): Poll
}

type Mutation {
    register(registerInput: RegisterInput): User!
    login(loginInput: LoginInput): User!
    createPoll(createPollInput: CreatePollInput): Poll!
    createPollResponse(pollResponseInput: createPollResponseInput): Poll!
    deletePoll(id:String!): Poll
}
`