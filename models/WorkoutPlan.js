const mongoose = require('mongoose');

const WorkoutPlan = new mongoose.Schema({
    title: {type: String, trim: true, default: '', required: true},
    workouts:{
        type: Array,
        default: [],
        required: true
    },
    created_by:{
        type: String,
        trim: true,
        required: true
    }
},
{
    collection: 'workout-plans',
    minimize: false
})

module.exports = mongoose.model('WorkoutPlan', WorkoutPlan);