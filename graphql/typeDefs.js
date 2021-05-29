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
    createdAt: String!
    createdBy: User
    active: Boolean
    questions: [PollQuestion]
    responses: [PollResponse]
}

type PollQuestion {
    title: String!
    description: String!
    questionType: String!
    required: Boolean!
    options: [String]
}

type PollResponse{
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

type Query {
    user(id: ID!): User
    poll(id: ID!): Poll
}

type Mutation {
    register(registerInput: RegisterInput): User!
    login(loginInput: LoginInput): User!
}
`