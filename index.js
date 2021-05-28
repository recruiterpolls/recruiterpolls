const { ApolloServer, PubSub } = require('apollo-server');
const mongoose = require('mongoose');

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers/users');


const  MONGODB  = "mongodb+srv://admin:adminpass@cluster0.3yynb.mongodb.net/recruiterDB?retryWrites=true&w=majority"

const server = new ApolloServer({
    typeDefs,
    resolvers,
    //context: ({ req }) => ({ req })
    context: ({ req }) => {
        // get the authorization from the request headers
        // return a context obj with our token. if any!
        const auth = req.headers.authorization || '';
        return {
          auth
        };
    }
});

mongoose.connect(MONGODB, {useNewUrlParser: true})
    .then(() => {
        console.log('MongoDB Connected');
        return server.listen({port: 5000});
    })
    .then((res) => {
        console.log(`Server running at ${res.url}`);
    });