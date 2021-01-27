import React, {useState, useEffect, useContext} from 'react'
import {UserContext} from '../UserContext'
import axios from 'axios'
import './create-workout.css'
import Button from 'react-bootstrap/Button'

const CreateWorkout = () => {

    let {user} = useContext(UserContext)
    console.log('Create Workout CONTEXT', user)

    const [WFVisibility, setWFVisibility] = useState(false)

    const [workoutName, setWorkoutName] = useState('')
    const [workoutReps, setWorkoutReps] = useState(0)
    const [workoutSets, setWorkoutSets] = useState(0)

    const [data, setData] = useState({
        title: '',
        workouts: [],
        created_by: ''
    })
    useEffect(() => {
        if(user){
            setData({...data, created_by: user._id})
        }
    }, [user])

    const addWorkout = e => {
        e.preventDefault()
        console.log('TRIGGERED')

        let temp = data.workouts;
        temp.push({ name: workoutName, sets: workoutSets, reps: workoutReps, maxreps: `${parseInt(workoutReps)+3}` })
        setData({...data, workouts: temp})
        setWorkoutName('')
        setWorkoutReps(0)
        setWorkoutSets(0)
        setWFVisibility(false)
    }

    const removeItem = (e) => {
        e.preventDefault()
        let id = parseInt(e.target.id)

        let temp = data.workouts;

        temp.splice(id,1)
        setData({...data, workouts: temp})
    }

    const addPlanToDB = async e => {
        e.preventDefault()

        try{
            let response = await axios.post('/api/create-plan', data)
            console.log(response)
            if(response.data === "success"){
                window.location = "/dashboard"
            }
        }catch(error){
            console.log(error)
        }

        console.log(data)
    }

    const cancelWorkout = () => {
        setWFVisibility(false);
        setWorkoutName('')
        setWorkoutReps(0)
        setWorkoutSets(0)
    }
    
    return (
        <div>
            <div className="sf-container container">
                <div className="input-wrapper">
                    <label style={{margin: '0px'}} htmlFor="wplan">Plan Title</label>
                    <input id="wplan" type='text' placeholder = 'Title' value = {data.title} onChange = {(e) => setData({...data, title:     e.target.value})}/>
                </div>
                {data.workouts.length > 0 ? data.workouts.map((element,index) => 
                <div key={index} style={{display:'flex', justifyContent: 'space-between', margin: '3px'}}>{element.name}, {element.sets} x {element.reps} <Button id={index} variant="outline-danger" onClick={removeItem}>remove</Button></div>) : <></>}
                {WFVisibility === false ? <Button style={{marginTop: '5px'}} variant="secondary" onClick = {() => setWFVisibility(true)} block>Add Workout</Button> : <></>}
                { data.workouts.length > 0 ? <Button onClick={addPlanToDB} block>Submit</Button> : <></>}
            </div>

            <div className="container">
            </div>

            {
                    WFVisibility === true ?
                    <div className="page-shade">
                        <form className="container workout-form" onSubmit = {addWorkout}>
                            <div className="input-wrapper">
                            <label style={{margin: '0px', color: 'white'}} htmlFor="wname">Workout Name</label>
                            <input id = "wname" type='text' placeholder = 'Workout Name' value = {workoutName} onChange = {(e) => setWorkoutName(e.target.value)}/>
                            </div>
                            <div className="input-wrapper">
                            <label style={{margin: '0px', color: 'white'}} htmlFor="wsets">Workout Sets</label>
                            <input id="wsets" type='number' placeholder = 'Number of Sets' value = {workoutSets} onChange = {(e) => setWorkoutSets(e.target.value)}/>
                            </div>
                            <div className="input-wrapper">
                            <label style={{margin: '0px', color: 'white'}}  htmlFor="wreps">Workout Reps</label>
                            <input id="wreps" type='number' placeholder = 'Number of Reps' value = {workoutReps} onChange = {(e) => setWorkoutReps(e.target.value)}/>
                            </div>
                            <Button type="submit" style={{marginTop: '8px'}} variant="primary" block>Add</Button>
                            <Button type="button" variant="secondary" onClick={() => cancelWorkout()} block>Cancel</Button>
                        </form></div> : <></>
                }
        </div>
    )
}

export default CreateWorkout
