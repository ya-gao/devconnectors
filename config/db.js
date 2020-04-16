// mongoDB connection

const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

// we can use nongoose.connect(db) .then .catch, but async await is cleaner
const connectDB = async () => {
    try {
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        console.log('MongoDB Connected...');
    } catch(err) {
        console.error(err.message);
        // Exit process with failure
        process.exit(1);
    }
}

module.exports = connectDB;