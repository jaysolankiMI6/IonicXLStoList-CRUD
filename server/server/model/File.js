const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let File = new Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    contactno: {
        type: Number
    },
    address: {
        type: String
    },
    linkdinid: {
        type: String
    },
    joindate: {
        type: Date
    }
}, {
    collection: 'files'
})

module.exports = mongoose.model('File', File)

