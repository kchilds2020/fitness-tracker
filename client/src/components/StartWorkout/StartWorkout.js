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
            }else{
                alert("Please enter an initial weight")
            }
        }
        updateWorkout()

        setCounter(counter+1)
    }

    const updateWorkout = async () => {
        let data = user
        data.workoutplan[workoutID] = workout
        if(parseInt(data.workoutplan[workoutID].workouts[counter].maxreps) <= parseInt(data.workoutplan[workoutID].workouts[counter].reps)){
            data.workoutplan[workoutID].workouts[counter].weight = `${parseInt(data.workoutplan[workoutID].workouts[counter].weight)+10}`
            data.workoutplan[workoutID].workouts[counter].reps = `${parseInt(data.workoutplan[workoutID].workouts[counter].reps)-3}`
        }else{
            data.workoutplan[workoutID].workouts[counter].reps = `${parseInt(data.workoutplan[workoutID].workouts[counter].reps)+1}`
        }

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
                <div>Sets: {workout.workouts[counter].sets}</div>
                <div>Reps: {workout.workouts[counter].reps}</div>
                <div>Weight: {workout.workouts[counter].weight ? workout.workouts[counter].weight : <input type="number" placeholder="Enter Initial Weight" onChange={e => setWeight(e.target.value)}/>}</div>
                <Button onClick={validateWeight}>Complete</Button>
            </div>: <></>}

            {workout && visible && counter === workout.workouts.length ? 
            <div>
                <h1 className="workout-title">{workout.title} Completed!</h1> 
                <Button onClick={() => {window.location = '/dashboard'}}>Go To Dashboard</Button>
            </div>: <></>}
        </div>
    )
}

export default StartWorkout
