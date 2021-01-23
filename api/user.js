const express = require('express');
const router = express.Router();
const User = require('../models/User');
const path = require('path');
var bcrypt = require('bcrypt');
const saltRounds = 10;

//get all users
router.get('/api/users/', (req,res) => {
    /* console.log(req.params.id) */
    User.find()
    .then(users => {
        /* console.log(user) */
        res.json(users)})
    .catch(err => console.log(err))
})

//get user with id
router.get('/api/users/:id', (req,res) => {
    /* console.log(req.params.id) */
    User.findOne({_id: req.params.id})
    .then(user => {
        /* console.log(user) */
        res.json(user)})
    .catch(err => console.log(err))
})

//update user based on id
router.post('/api/update-user', async (req, res) => {
    try{
        const response = await User.updateOne({_id: req.body._id}, {
            $set: {
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
            }
        })
        res.json(response)
    }catch(error){console.log(error)}
});

//delete user by id
router.post('/api/delete-user/', async (req,res) => {
    try{
        let response = await User.deleteOne({_id: req.body._id})
        res.json(response)
    }catch(error){
        console.log(error)
    }
})

//register user
router.post('/api/register', async (req, res) => {

    try{
        const hashedPassword = bcrypt.hashSync(req.body.password,saltRounds);
        const user = await User.create({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: hashedPassword,
        })

        req.session.userID = user._id;

        res.json(user)
        
    }catch(error){
        console.log(error)
        res.send(error)
    }  
    
});

//login user
router.post('/api/login-user', async (req,res) => {
    const {email, password} = req.body;

    try{
        let user = await User.findOne( {email: email} )
        if(user !== null){
            bcrypt.compare(password, user.password, function(err, isMatch) {
                if(isMatch === true){
                    req.session.userID = user._id
                    console.log(req.session)
                    res.json(user)
                }else{
                    console.log('invalid password');
                    res.send('invalid password');
                }
            })
        }else{
            console.log('invalid email');
            res.send('invalid email');
        }
    }catch(error){console.log(error)}
    
         
})


//get user data of session
router.get('/api/get-session', async (req,res) => {
    let userInfo = await User.findOne({_id: req.session.userID})
    res.json({userInfo})

    
})

//check if session exists
router.get('/api/check-session', (req,res) => {
   !req.session.userID ? res.send(false) : res.send(true)
})

//destroy session
router.get('/logout', (req,res) => {
    req.session.destroy();
})

module.exports = router;