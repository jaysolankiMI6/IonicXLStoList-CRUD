const express = require('express');
const { nextTick } = require('process');
const app = express();
const fileRoute = express.Router();
let FileModel = require('../model/File');
let FileStoreModel = require('../model/FileStore');
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
// import { UPLOAD_PATH, app, upload } from './../index.js';

fileRoute.route('/').get((req, res) => {
    FileModel.find((error, file) => {
        if (error) {
            return next(error);
        } else {
            res.json(file)
            console.log('File Retrived');
        }
    })
})

fileRoute.route('/create-file').post((req, res, next) => {
    // FileModel.create(req.body, (err, file) => {
    console.log("req ",req.body);
    if (err) {
        return next(err)
    } else {
        res.json(file);
        console.log('File Created');
    }
    // })
})

fileRoute.route('/fetch-file/:id').get((req, res) => {
    FileModel.findById(req.params.id, (err, file) => {
        if (err) {
            return next(err)
        } else {
            res.json(file);
            console.log('File Retrived');
        }
    })
})

fileRoute.route('/update-file/:id').put((req, res, next) => {
    FileModel.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, (err, file) => {
        if (err) {
            return next(err)
        } else {
            res.json(file);
            console.log('File Updated');
        }
    })
})

fileRoute.route('/delete-file/:id').delete((req, res, next) => {
    FileModel.findByIdAndRemove(req.params.id, (err, file) => {
        if (err) {
            return next(err)
        } else {
            res.status(200).json({
                msg: file
            });
            console.log('File Deleted');
        }
    })
})

fileRoute.route('/uploadfile', upload.single("photo"), (req, res) => {
    FileStoreModel.find(req.file, (err, file) => {
        if (err) {
            return next(err)
        } else {
            res.json(file);
            // res.json({ file: req.file });
            console.log(req.file);
        }
    })
})

// Upload a new image with description
app.post('/upload', upload.single('image'), (req, res, next) => {
    // Create a new image model and fill the properties
    let newImage = new Image();
    newImage.filename = req.file.filename;
    newImage.originalName = req.file.originalname;
    newImage.desc = req.body.desc
    newImage.save(err => {
        if (err) {
            return res.sendStatus(400);
        }
        res.status(201).send({ newImage });
    });
});

// Get all uploaded images
app.get('/images', (req, res, next) => {
    // use lean() to get a plain JS object
    // remove the version key from the response
    Image.find({}, '-__v').lean().exec((err, images) => {
        if (err) {
            res.sendStatus(400);
        }

        // Manually set the correct URL to each image
        for (let i = 0; i < images.length; i++) {
            var img = images[i];
            img.url = req.protocol + '://' + req.get('host') + '/images/' + img._id;
        }
        res.json(images);
    })
});

// Get one image by its ID
app.get('/images/:id', (req, res, next) => {
    let imgId = req.params.id;

    Image.findById(imgId, (err, image) => {
        if (err) {
            res.sendStatus(400);
        }
        // stream the image back by loading the file
        res.setHeader('Content-Type', 'image/jpeg');
        fs.createReadStream(path.join(UPLOAD_PATH, image.filename)).pipe(res);
    })
});

// Delete one image by its ID
app.delete('/images/:id', (req, res, next) => {
    let imgId = req.params.id;

    Image.findByIdAndRemove(imgId, (err, image) => {
        if (err && image) {
            res.sendStatus(400);
        }

        del([path.join(UPLOAD_PATH, image.filename)]).then(deleted => {
            res.sendStatus(200);
        })
    })
});

module.exports = fileRoute;