import React, {useState} from 'react'

const CreateWorkout = () => {
    const [WFVisibility, setWFVisibility] = useState(false)

    const [workoutName, setWorkoutName] = useState('')
    const [workoutReps, setWorkoutReps] = useState(0)
    const [workoutSets, setWorkoutSets] = useState(0)

    const [data, setData] = useState({
        planTitle: '',
        workouts: []
    })

    const addWorkout = e => {
        e.preventDefault()

        let temp = data.workouts;
        temp.push({ name: workoutName, sets: workoutSets, reps: workoutReps })
        setData({...data, workouts: temp})
        setWFVisibility(false)
    }

    const addPlanToDB = e => {
        e.preventDefault()

        console.log(data)
    }

    
    return (
        <div>
            Create Workout
                <input id='text' placeholder = 'Title' value = {data.planTitle} onChange = {(e) => setData({...data, planTitle:     e.target.value})}/>
                {data.workouts.length > 0 ? data.workouts.map(element => <div>{element.name}, {element.sets} x {element.reps} </div>) : <></>}
                <button onClick = {() => setWFVisibility(WFVisibility === true ? false : true)}>Add Workout</button>
                {
                    WFVisibility === true ?
                        <form onSubmit = {addWorkout}>
                            <input id='text' placeholder = 'Workout Name' value = {workoutName} onChange = {(e) => setWorkoutName(e.target.value)}/>
                            <input id='number' placeholder = 'Number of Sets' value = {workoutSets} onChange = {(e) => setWorkoutSets(e.target.value)}/>
                            <input id='number' placeholder = 'Number of Reps' value = {workoutReps} onChange = {(e) => setWorkoutReps(e.target.value)}/>
                            <button>Add</button>
                        </form>  : <></>
                }
                <button onClick={addPlanToDB}>Submit</button>
        </div>
    )
}

export default CreateWorkout
