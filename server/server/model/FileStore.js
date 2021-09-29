const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let FileStore = new Schema({
    file: {
        type: []
    }   
}, {
    collection: 'filestore'
})

module.exports = mongoose.model('FileStore', FileStore)

