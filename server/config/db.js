const mongoose = require('mongoose');

const connectDB = async () => {
    return mongoose
    .connect("mongodb://localhost:27017/contact_mern")
    .then(() => console.log(`connection to database established...`))
    .catch((err) => console.log(err));   
};

module.exports = connectDB;