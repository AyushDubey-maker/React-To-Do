import React,{useState,useEffect} from 'react'
import './App.css';
import Homepage from './pages/Homepage';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import Login from './login/Login';
import Register from './login/Register';
import { auth } from './firebase';
function App() {
 
  const [user,setUser]=useState('')
  useEffect(()=>{
    const unsubscribe=  auth.onAuthStateChanged((authUser)=>{
      if(authUser){
         setUser(authUser)
        
         if(authUser.displayName){
           //dont update username
         }
      }else{
          setUser(null);
      }
    })
    return()=>{
      //Perform some Cleanup actions.
      unsubscribe();
    }
  },[])
  return (
    <div className="App">
      <Router>
        {!user?(
        <Switch>
    <Route path="/register">
     <Register/>
     </Route>
     <Route path="/">
     <Login/>
    
     </Route>
        </Switch>
        ):(
<Switch>
<Route path="/">
<Homepage/>
</Route>
</Switch>
        )}
      </Router>
     
    </div>
  );
}

export default App;
