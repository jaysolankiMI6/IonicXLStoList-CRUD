const express = require('express');
const { nextTick } = require('process');
const app = express();
const fileRoute = express.Router();
let FileModel = require('../model/File');

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
    FileModel.create(req.body, (err, file) => {
        if (err) {
            return next(err)
        } else {
            res.json(file);
            console.log('File Created');
        }
    })
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
        if(err){
            return next(err)
        }else{
            res.status(200).json({
                msg: file
            });
            console.log('File Deleted');
        }
    })
})

module.exports = fileRoute;