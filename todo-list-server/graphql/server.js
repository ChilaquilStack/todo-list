require('dotenv').config();

const DB = require('../db');
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');
const { ApolloServer } = require('apollo-server');

const server = new ApolloServer({ typeDefs, resolvers });
const URI = 'mongodb://root:password@localhost:27017/'

server
    .listen()
    .then(({url}) => {
        DB.connect(URI);
        console.log(`🚀  Server ready at ${url}`)
    });