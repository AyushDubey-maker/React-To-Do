import { Button, Input } from '@material-ui/core'
import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import {auth} from '../firebase'

import './Register.css'

function Register() {
    const history=useHistory()
    const [username,setUsername]=useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [confirmpassword,setConfirmPassword]=useState('')
  
    function register(){
        if(password===confirmpassword){
          
     auth.createUserWithEmailAndPassword(email,password).then(auth=>{
    
         history.push('/')
         return auth.user.updateProfile({
             displayName:username
            })
    }).catch(error=>{
      alert(error.message)
    })
}
    }
 

    return (
        <div className="register">
           <h2>Register</h2>
            <div className="register_form">
                <form>
                    <Input value={username} onChange={(e)=>setUsername(e.target.value)} className="input_register" placeholder="Username"/>
                    <Input  value={email} onChange={(e)=>setEmail(e.target.value)} className="input_register" placeholder="Email"/>
                    <Input  value={password} onChange={(e)=>setPassword(e.target.value)} className="input_register" type="password" placeholder="Password"/>
                    <Input  value={confirmpassword} onChange={(e)=>setConfirmPassword(e.target.value)} className="input_register" type="password" placeholder="Confirm Password"/>
                 
                    <Button onClick={register} className="register_button" color="primary" variant="contained">Register</Button>
                    
                    <p>Already have an account? <Link className="a" to="/">Login</Link></p>
                </form> 

            </div>
        </div>
    )
}

export default Register
