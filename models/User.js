const mongoose = require('mongoose');

const User = new mongoose.Schema({
    firstname: {type: String, trim: true, default: ''},
    lastname: {type: String, trim: true, default: ''},
    email: {type: String, trim: true, default: ''},
    password: {type: String, trim: true, default: ''},
    weight: {
        type: Number,
        required: false,
        default: 0,
        maxlength: [999, 'please pick a valid weight']
    },
    height: {
        type: Number,
        required: false,
        default: 0,
        maxlength: [999, 'please pick a valid weight']
    },
    workoutplan:{
        type: Array,
        default: [],
        required: false
    }
},
{
    collection: 'users',
    minimize: false
})

module.exports = mongoose.model('User', User);