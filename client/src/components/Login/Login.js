import React, {useState, useEffect} from 'react';
import axios from 'axios'
import { useHistory, useLocation } from 'react-router-dom'

export const Login = () => {

    let history = useHistory();
    let location = useLocation();
    let { from } = location.state || { from: { pathname: "/dashboard" } };
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        axios.get('./api/check-session')
        .then(res => {
            if(res.data === true){
                window.location = '/dashboard'
            }
        })
    }, [])

    const loginUser = async (evt) => {
        evt.preventDefault();

        const user = {
            email: email,
            password: password

        }

        try {   
            const response = await axios.post('/api/login-user', user)
            console.log(response)
            if(response.data === "invalid email"){
                setEmail('');
                setPassword('');
                alert('That username does not exist in our system')
                
            }else if(response.data === "invalid password"){
                setPassword('');
                alert('Invalid password')
                
            }else{
                localStorage.setItem('user', response.data._id)
                //go to home
                history.replace(from)
            }
        } catch (error) {
            console.log(error)
        }
        
    }

    const checkSession = (e) => {
        e.preventDefault()

        axios.get(`/api/get-session`,{
          headers: {
              'Content-Type': 'application/json'
          }
      })
      .then(idRes => {
        console.log('App.js info',idRes)         
      })
    }

    return(
        <>
            <form onSubmit = {loginUser}>
                <h2>Login</h2>
                <input id='email' placeholder = 'Email Address' value = {email} onChange = {(e) => setEmail(e.target.value)}/>
                <input id='password' placeholder = 'Password' value = {password} onChange = {(e) => setPassword(e.target.value)} type="password"/>
                <div style={{margin: '10px 0px'}}><a href="/register">Dont have an account? Register</a></div>
                <button type="submit" variant="primary">Login</button>
            </form>
            <button onClick={checkSession}>check sesh</button>
        </>
    );
};

export default Login;