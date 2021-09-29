const TodoModel = require('../models/Todo');

const resolvers = {
    Query: {
        getTodos: async () => {
            try {
                return await TodoModel.find({});
            } catch (error) {
                return error;
            }
        },
        getTodo: async (_, {id}) => {
            try {
                return await TodoModel.findById(id);
            } catch (error) {
                return error;
            }
        }
    },
    Mutation: {
        setTodo: async (_, {input}) => {
            try {
                return await TodoModel.create(input);
            } catch (error) {
                return error;
            }
        },
        deleteTodo: async function(_, {id}) {
            try {
                const todo = await TodoModel.findOneAndRemove({_id: id});
                return todo;
            } catch(error) {
                return error;
            }
        },
        async updateTodo(_, {input}) {
            try {
                const todo = await TodoModel.findOneAndUpdate({_id: input.id}, input, {new: true});
                return todo;
            } catch(error) {
                return error;
            }
        }
    }
};

module.exports =  resolvers;