const mongoose = require('mongoose');
require('dotenv').config();

class DB {

    #dbConfig;
    #URI;

    constructor () {
        this.#URI = process.env.MONGO_URI;
        this.#dbConfig = {
            useCreateIndex: true,
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true,
        };
    }

    async connect () {
        try {
            await mongoose.connect(this.#URI, this.#dbConfig);
            console.log('DB connected')
        } catch (error) {
            console.error(error);
            process.exit(1);
        }
    
    }

}

module.exports = new DB();