const TodoModel = require('../models/Todo');

class TodosController {
    
    index = async (req, res) => {
        try {
            const todos = await TodoModel.find({user: req.authUser.id});
            res.status(200).json({todos}).end();
        } catch (error) {
            res.status(500).json({error: error.message}).end();
        }
    }

    create = async (req, res) => {
        if(!req.body) res.status(404).json({message: 'Text is required'}).end();
        try {
            const todo = await TodoModel.create({...req.body, user: req.authUser.id});
            res.status(201).json({todo});
        } catch (error) {
            res.status(500).json({error: error.message}).end();
        }
    }
    
    destroy = async (req, res) => {
        if(!req.params.id) 
            res.status(404).json({message: 'id is required'});
        try {
            const todo = await TodoModel.findOneAndRemove({_id: req.params.id});
            if(!todo) return res.status(404).json({message: "There's not todo"}).end();
            if(todo.user._id.toString() !== req.authUser.id.toString())
                res.status(404).json({message: 'You dont have access to modify this todo'}).end();
            res.status(200).json({todo});
        }
        catch(error) {
            res.status(500).json({error: error.message}).end();
        }
    }
    
    update = async (req, res) => {
        const query = {_id: req.params.id};
        if(!req.params.id) return res.status(404).json({message: 'id is required'}).end();
        try {
            const todo = await TodoModel.findOneAndUpdate(query, req.body, {new: true});
            if(!todo) return res.status(404).json({message:"Todo doesn't exist"}).end(); 
            if(todo.user._id.toString() !== req.authUser.id.toString())
                res.status(404).json({message:'You dont have access to delete this todo'}).end();
            res.status(200).json({todo}).end();
        } catch (error) {
            res.status(500).json({error: error.message}).end();
        }
    }

}

module.exports = new TodosController()