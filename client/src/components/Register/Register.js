import React, {useState, useEffect} from 'react';
import axios from 'axios';

export const Register = () => {

    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
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

    const registerUser = async (evt) =>{
        evt.preventDefault();
        console.log('register user');
        const user = {
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: password
        }

            try{
                let response = await axios.post('/api/register', user)

                localStorage.setItem('user', response.data._id)
                window.location.href=  '/dashboard'
            }catch(error){console.log(error)}
    }

    return(
        <>
            <form onSubmit={registerUser}>
                <h2>Register</h2>
                <input id='firstname' placeholder='First Name' value = {firstname} onChange = {e => setFirstname(e.target.value)}/>
                <input id='lastname' placeholder='Last Name' value = {lastname} onChange = {e => setLastname(e.target.value)}/>
                <input id='email' placeholder='Email Address' value = {email} onChange = {e => setEmail(e.target.value)} type="email"/>
                <input id='password' placeholder='Password' value = {password} onChange = {e => setPassword(e.target.value)} type="password"/>

                <button >Register!</button>
            </form>
        </>
    );
};

export default Register;