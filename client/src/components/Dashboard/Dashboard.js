import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import {UserContext} from '../UserContext'

const Dashboard = () => {

    let {user} = useContext(UserContext)
    console.log('HOME USER CONTEXT', user)

    return(
        user ?
            <>
                <h1>Hello, {user.firstname}!</h1>
                {
                    user.workoutplan.length > 0 ? user.workoutplan.map((element,index) => <div key={index}>{element.title}</div>) : <></>
                }
                <button onClick={() => window.location = '/create-workout'}>Create a Plan</button>
            </> : <></>
    );
}

export default Dashboard;