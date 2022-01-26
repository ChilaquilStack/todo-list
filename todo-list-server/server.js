require('dotenv').config();
const cors = require('cors');
const express = require('express');
const auth = require('./middleware/Auth');
const http = require('http');
const { Server: Serv } = require('socket.io');
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

        this.server = http.createServer(this.app);

        this.io = new Serv(this.server);

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
        this.server.listen(
            this.port, 
            () => console.log(`Server is running on port ${this.port}`)
        );
    }

}
    
module.exports = new Server();