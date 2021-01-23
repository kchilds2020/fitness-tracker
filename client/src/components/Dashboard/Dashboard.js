import React, { useContext } from 'react';
import {UserContext} from '../UserContext'

const Dashboard = () => {

    let {user} = useContext(UserContext)
    console.log('HOME USER CONTEXT', user)

    return(
        user ?
            <>
                <h1>Hello, {user.firstname}!</h1>
                <button onClick={() => window.location = '/create-workout'}>Create a workout</button>
            </> : <></>
    );
}

export default Dashboard;