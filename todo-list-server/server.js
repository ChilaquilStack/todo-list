require('dotenv').config();
const cors = require('cors');
const express = require('express');
const auth = require('./middleware/Auth');

class Server {

    constructor(){
        this.auth = auth;
        this.cors = cors();
        this.app = express();
        this.paths = {
            auth: '/auth',
            todos: '/todos',
            users: '/users'
        }
        
        this.middlewares();
        this.routes();
        
        this.port = process.env.PORT || 3000;
        
    }

    middlewares() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: true}));
    }
    
    routes() {
        this.app.use(this.paths.auth, require('./routes/auth'));
        this.app.use(this.paths.todos, this.auth, require('./routes/todos'));
        this.app.use(this.paths.users, this.auth, require('./routes/users'));
    }

    listen() {
        this.app.listen(
            this.port, 
            () => console.log(`Server is running on port ${this.port}`)
        );
    }

}
    
module.exports = new Server();