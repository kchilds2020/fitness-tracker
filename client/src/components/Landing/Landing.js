import React, {useEffect} from 'react';
import axios from 'axios'

const Landing = () => {

    useEffect(() => {
        axios.get('./api/check-session')
        .then(res => {
            if(res.data === true){
                window.location = '/dashboard'
            }
        })
    }, [])

    return(
        <h1>
            Fitness Tracker
        </h1>
    );
};

export default Landing;