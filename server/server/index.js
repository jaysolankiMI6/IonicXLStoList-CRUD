const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const database = require('./db/database');


//MongoDB connetion 
mongoose.Promise = global.Promise;
mongoose.connect(database.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useFindAndModify: false
}).then(() => {
    console.log("Database connected");
}, error => {
    console.log("Database not connected ", error);
})

// const URI = process.env.MONGODB_URL;
// mongoose.connect(URI, { useUnifiedTopology: true } 
// );

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})

const fileRoute = require('./routes/file.route');

const app = express();
app.use(express.json());

app.use(express.urlencoded({
    extended: false
}));
app.use(cors());
app.use('/api', fileRoute)

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log("port connected ", port)
})

app.use(function (err, res,) {
    console.err(err.message);
    if (!err.statusCode) {
        err.statusCode = 500;
    }
    res.status(err.statusCode).send(err.message);
})