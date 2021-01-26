import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import {UserContext} from '../UserContext'
import Button from 'react-bootstrap/Button'

const Dashboard = () => {

    let {user} = useContext(UserContext)
    console.log('HOME USER CONTEXT', user)

    const goToWorkout = (index) => {
        console.log(index)
        window.location = `/start-workout/?id=${index}`
    }

    return(
        user ?
            <>
                <h1>Hello, {user.firstname}!</h1>
                {
                    user.workoutplan.length > 0 ? user.workoutplan.map((element,index) => <div key={index}>{element.title}<Button onClick={() => goToWorkout(index)}>Start Workout</Button></div>) : <></>
                }
                <button onClick={() => window.location = '/create-workout'}>Create a Plan</button>
            </> : <></>
    );
}

export default Dashboard;