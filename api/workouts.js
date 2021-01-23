const express = require('express');
const WorkoutPlan = require('../models/WorkoutPlan');
const router = express.Router();
const User = require('../models/WorkoutPlan');


//register user
router.post('/api/create-plan', async (req, res) => {

    try{
        const plan = await WorkoutPlan.create({
            title: req.body.title,
            workouts: req.body.workouts,
            created_by: req.body.created_by
        })
        res.json(plan)
        
    }catch(error){
        console.log(error)
        res.send(error)
    }  
    
});


//get all users
router.get('/api/workout-plans/', (req,res) => {
    /* console.log(req.params.id) */
    User.find()
    .then(plans => {
        /* console.log(user) */
        res.json(plans)})
    .catch(err => console.log(err))
})

//get user with id
router.get('/api/workout-plans/:id', (req,res) => {
    /* console.log(req.params.id) */
    WorkoutPlan.findOne({_id: req.params.id})
    .then(plan => {
        /* console.log(user) */
        res.json(plan)})
    .catch(err => console.log(err))
})

//update user based on id
router.post('/api/update-plan', async (req, res) => {
    try{
        const response = await WorkoutPlan.updateOne({_id: req.body._id}, {
            $set: {
                title: req.body.title,
                workouts: req.body.workouts,
                created_by: req.body.created_by,
            }
        })
        res.json(response)
    }catch(error){console.log(error)}
});

//delete user by id
router.post('/api/delete-plan/', async (req,res) => {
    try{
        let response = await WorkoutPlan.deleteOne({_id: req.body._id})
        res.json(response)
    }catch(error){
        console.log(error)
    }
});



module.exports = router;