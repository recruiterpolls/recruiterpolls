const { gql } = require('apollo-server');

module.exports = gql`
type User {
    id: ID!
    email: String!
    token: String!
    username: String!
    createdAt: String!
}
type Poll {
    id: ID!
    pollTitle: String! 
    pollDescription: String!
    createdAt: String!
    createdBy: User
    active: Boolean
    questions: [PollQuestion]
    responses: [PollResponse]
}

type PollQuestion {
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
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
}


type Query {
    user(id: ID!): User
}
type Mutation {
    register(registerInput: RegisterInput): User!
}
`