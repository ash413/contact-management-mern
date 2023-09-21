const express = require('express');
const morgan = require('morgan');
const connectDB = require('./config/db');

const app = express();

//middlewares
app.use(express.json()); //json format
app.use(morgan("tiny")); //when you hit any API endpoint it will log in the console. 
//endpoint with request and time it took to send back response


//routes
app.use("/api", require("./routes/auth"));


//server configurations
const PORT = process.env.PORT || 8000;
app.listen(PORT, async () => {     //async bc using await keyword
    try {
        await connectDB();       //we dont want app to be executed before app successfully connects to database
        console.log(`server listening on port: ${PORT}`);
    } catch (err) {
        console.log(err);
    }
});