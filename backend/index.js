
// server entry point
const dotenv = require('dotenv');
dotenv.config();

const app = require('./app');
const connectToDb = require('./config/databse');

connectToDb();

app.listen(process.env.PORT, () => {
    console.log("Server running");
})