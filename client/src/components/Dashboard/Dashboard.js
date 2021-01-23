import React, { useContext } from 'react';
import {UserContext} from '../UserContext'

const Dashboard = () => {

    let {user} = useContext(UserContext)
    console.log('HOME USER CONTEXT', user)

    return(
        user ?
            <>
                <div>email: {user.email}</div>
                <div>firstname: {user.firstname}</div>
                <div>lastname: {user.lastname}</div>
            </> : <></>
    );
}

export default Dashboard;