const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = mongoose.Schema({
    
    email:{
        trim: true,
        type: String,
        unique: true,
        required: true,
    },
    
    password: {
        trim: true,
        type: String,
        required: true,
    },
    
    todos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Todo',
        required: true
    }]

},
    {timestamps: true }
);

UserSchema.virtual('passwords');

UserSchema.pre('validate', async function() {
    if(!this?.password) return;
    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(this.password, salt);
        this.password = hash;
    } catch(error) {
        throw error;
    }
});

UserSchema.statics.authenticate = async function({email, password}) {
    const user = await this.findOne({email});
    if(!user) throw new Error('email or password was wrong')
    const result = await bcrypt.compare(password, user.password);
    if(!result) throw new Error('email or password was wrong')
    return user;
}

module.exports = mongoose.model('User', UserSchema);