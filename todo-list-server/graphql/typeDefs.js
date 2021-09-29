const { gql } = require('apollo-server');

const typeDefs = gql`
    
    type User {
        id: ID!
        email: String
        todo: [Todo!]!
    }

    type Todo {
        id: ID
        user: User!
        text: String!
        isCompleted: Boolean
        createdAt: String
        updatedAt: String
    }

    input todoInput {
        user: ID!
        text: String!
    }

    input todoUpdateInput {
        id: ID!
        text: String!
    }

    type Query {
        getTodos: [Todo!]!
        getTodo(id: ID!): Todo!
    }

    type Mutation {
        deleteTodo(id: ID!): Todo!
        setTodo(input: todoInput!): Todo!
        updateTodo(input: todoUpdateInput!): Todo!
    }
`;

module.exports = typeDefs;