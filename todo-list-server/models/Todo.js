const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({

    text: {
        trim: true,
        type: String,
        required: true,
    },

    isCompleted: {
        type: Boolean,
        default: false,
    },
    
    user: {
        ref: 'User',
        required: true,
        type: mongoose.Schema.Types.ObjectId,
    }

}, 
    { timestamps: true }
);

module.exports = mongoose.model('Todo', TodoSchema);