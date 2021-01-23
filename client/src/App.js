import React, {useState, useEffect} from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Landing from './components/Landing/Landing';
import Dashboard from './components/Dashboard/Dashboard';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import PrivateRoute from './components/PrivateRoute'
import NavigationBar from './components/NavigationBar/NavigationBar';
import {CookiesProvider} from 'react-cookie'
import { UserContext } from './components/UserContext';
import axios from 'axios'

function App() {

  const [user, setUser] = useState(null);

  useEffect(() => {
    let mounted = true
    
    axios.get(`/api/get-session`,{
          headers: {
              'Content-Type': 'application/json'
          }
      })
      .then(idRes => {
        console.log('App.js info',idRes)
        if(mounted){
          setUser(idRes.data.userInfo)
        }            
      })

    return () => mounted = false
  },[setUser])

  return (
    <CookiesProvider>
        <Router> 
          <UserContext.Provider value={{user}}>
            <NavigationBar/>
          </UserContext.Provider> 
            <Switch>           
              <PrivateRoute path="/dashboard" user={user} setUser={setUser}>     
                <Route exact strict component={Dashboard}/>
              </PrivateRoute>
        
              <UserContext.Provider value={{user}}>
                <Route path="/" exact strict component={Landing}/>
                <Route path="/login"  exact strict component={Login} />
                <Route path="/register"  exact strict component={Register} />
              </UserContext.Provider>       
            </Switch>
        </Router>
    </CookiesProvider>

  );
}

export default App;
