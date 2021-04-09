import {  Button, FormHelperText, Input } from '@material-ui/core'
import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'

import { auth } from '../firebase'
import './Login.css'

function Login() {
    const history=useHistory()
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    function login(){
         auth.signInWithEmailAndPassword(email,password)
        .then(()=>{
            history.push('/')
        })
        .catch((error)=>alert(error.message))
    }
 
    return (
        <div className="login">
         <h2>Login</h2>
            <div className="login_form">
   
   <form>
   <Input value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email" className="input_email" required type="email"/>
   <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>
  
   <Input value={password} onChange={(e)=>setPassword(e.target.value)} className="input_password" placeholder="Password" required type="password" />
   <Button className="login_button" color="primary" variant="contained" onClick={login}>Login</Button>

  <p>Do not have an account? <Link className="a" to="/register"> Register</Link></p>
   </form>
   </div>
        </div>
    )
}

export default Login

