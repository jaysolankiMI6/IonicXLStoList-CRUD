const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser");
const morgan = require("morgan");
const multer = require("multer");

const mongoose = require('mongoose');
const database = require('./db/database');
// const upload = multer({ dest: "uploads/" });

// Generell properties
// export let UPLOAD_PATH = 'uploads'
// export let PORT = 3000;


// Multer Settings for file upload
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, UPLOAD_PATH)
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now())
    }
})
// export let upload = multer({ storage: storage })

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
app.use(morgan("combined"));
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(cors());
app.use('/api', fileRoute)

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.post("/upload", upload.single("photo"), (req, res) => {
//   console.log(req.file);
// });

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