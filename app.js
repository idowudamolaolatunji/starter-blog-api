
const express = require('express');
const mongoose  = require('mongoose');
const dotenv = require("dotenv");
const cors = require('cors');

dotenv.config({ path: './config.env' });
 
const userRouter = require('./routes/userRoute');
const blogRoute = require('./routes/blogRoute.js');

const app = express();
app.use(express.json());
app.use(cors());

const databaseUrl = process.env.DBSTRING;
const PORT = process.env.PORT

app.use(function(_, _, next) {
    console.log('I am fetching...');
    next();
});

// MOUNTING ROUTE
app.use('/api/users', userRouter);
app.use('/api/posts', blogRoute);

// DATABASE CONNECTION
async function connectDB() {
    try {
        await mongoose.connect(databaseUrl);
        console.log('Database connected successfully....')
    } catch(err) {
        console.log(err.message)
    }
}
connectDB();

//===========================//
app.listen(PORT, 'localhost', function(){
    console.log('App is listening on a port 3001...')
})