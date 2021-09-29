const DB = require('./db');
const server = require('./server');

DB.connect();
server.listen();