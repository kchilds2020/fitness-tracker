import React, { useContext } from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import axios from 'axios'
import {UserContext} from '../UserContext'
import './nav-bar.css'

function NavigationBar() {

    let {user} = useContext(UserContext)
    console.log('NAV USER CONTEXT', user)

    const active = window.location.pathname

    const logout = e => {
        e.preventDefault()

        try{      
            axios.get('/logout')
            localStorage.removeItem('user')
            window.location.href = '/'
        }catch(error){
            alert(error)
        }
    }

    const login = e => {
        e.preventDefault()
        window.location.href = '/login'
    }
    return (
        <div className="overlay">
            <Navbar collapseOnSelect bg="dark" variant="dark" expand="xl">
                <Navbar.Brand href="/home">Mern Template</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
                    <Nav className="justify-content-end">
                        {!user ? 
                            <>
                                <Button variant="primary" onClick={login} style={{margin: "0px 20px"}}>Login</Button>
                            </> :
                            <>
                                <Nav.Link className={active === '/dashboard' ? "active" : ""} href ="/dashboard">Dashboard</Nav.Link>
                                <NavDropdown.Divider />
                                <Button variant="danger" onClick={logout} style={{margin: "0px 20px"}}>Logout</Button>
                            </>
                            }
                    
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            </div>
    )
}

export default NavigationBar