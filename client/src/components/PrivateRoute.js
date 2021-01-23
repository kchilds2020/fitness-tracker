import React, {useEffect} from 'react'
import {Redirect, Route, useHistory} from 'react-router-dom'
import axios from 'axios'
import {UserContext} from './UserContext'


function PrivateRoute({children, path,user, setUser, menu, setMenu, ...rest}) {
    let history = useHistory()


    useEffect(() => {
        let mounted = true
        if(user === null){
            axios.get(`/api/get-session`)
            .then(idRes => {
                
                    console.log('PrivateRoute.js info',idRes)
                    if(!idRes.data.userInfo){
                        console.log('Push')
                        localStorage.removeItem('user')
                        history.push('/login')
                    }
                    if(mounted){
                        setUser(idRes.data.userInfo)
                    }            
            })
        }

          return () => mounted = false
      },[history, setMenu, setUser, user])


    return <UserContext.Provider value = {{user, menu}}><Route {...rest} render={({ location }) => localStorage.getItem('user') !== null ? (children) : ( <Redirect to={{ pathname: "/login", state: { from: location }}}/>)}/></UserContext.Provider>

}


export default PrivateRoute