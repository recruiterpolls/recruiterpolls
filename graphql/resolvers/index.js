const pollsResolvers = require('./polls');
const usersResolvers = require('./users');

module.exports = {

    Query: {
        ...usersResolvers.Query,
        ...pollsResolvers.Query,
    },
    Mutation: {
        ...usersResolvers.Mutation,
        ...pollsResolvers.Mutation,

    },
    
};