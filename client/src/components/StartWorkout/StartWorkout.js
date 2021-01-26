import React, { useState, useEffect, useContext } from 'react';
import {UserContext} from '../UserContext'
import Button from 'react-bootstrap/Button'
import axios from 'axios';

const StartWorkout = () => {

    let {user} = useContext(UserContext)
    console.log('HOME USER CONTEXT', user)

    const [workoutID, setWorkoutID] = useState('')
    const [workout, setWorkout] = useState('');
    const [visible, setVisible] = useState(false)
    const [counter, setCounter] = useState(0)
    const [weight, setWeight] = useState('')

    useEffect(() => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const id = parseInt(urlParams.get('id'))

        if(user){
            setWorkoutID(id)
            setWorkout(user.workoutplan[id])
        }
        
    }, [user])

   /*  useEffect(() => {
        if(workout && counter === workout.workouts.length){
            window.location = "/dashboard"
        }
    }, [counter]) */

    const validateWeight = () => {
        if(!workout.workouts[counter].weight){
            if(weight){
                workout.workouts[counter].weight = weight
                setCounter(counter+1)
            }else{
                alert("Please enter an initial weight")
            }
        }else{
            setCounter(counter+1)
        }
    }

    const updateWorkout = async () => {
        let data = user
        data.workoutplan[workoutID] = workout
        data.workoutplan[workoutID].workouts.forEach(element => {
            if(element.maxreps === element.reps){
                element.weight = `${parseInt(element.weight)+10}`
            }else{
                element.reps = `${parseInt(element.reps) + 1}`
            }
        })
        try{
            let response = await axios.post(`/api/update-user`,data)
            console.log(response)
        }catch(error){
            console.log(error)
        }
    
    }

    return (
        <div>
            {workout && !visible ? <div>
                        <h1 className="workout-title">{workout.title}</h1> 
                        <Button onClick={() => setVisible(true)}>Start Workout</Button>
                    </div>: <></>}
            
            {workout && visible && counter < workout.workouts.length ? 
            <div>
                <div>{workout.workouts[counter].name}</div>
                <div>{workout.workouts[counter].sets}</div>
                <div>{workout.workouts[counter].reps}</div>
                <div>{workout.workouts[counter].weight ? workout.workouts[counter].weight : <input type="number" placeholder="Enter Initial Weight" onChange={e => setWeight(e.target.value)}/>}</div>
                <Button onClick={validateWeight}>Complete</Button>
            </div>: <></>}

            {workout && visible && counter === workout.workouts.length ? 
            <div>
                <h1 className="workout-title">{workout.title} Completed!</h1> 
                <Button onClick={updateWorkout}>Go To Dashboard</Button>
            </div>: <></>}
        </div>
    )
}

export default StartWorkout
