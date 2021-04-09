import React,{useState,useEffect} from 'react'
import ToDo from '../components/ToDo'
import './Homepage.css'
import { Button, InputLabel,FormControl,Input} from '@material-ui/core'
import firebase from 'firebase'
import { auth, db } from '../firebase'

function Homepage() {
    const [todos,setTodos]=useState([]);
    const [input,setInput]=useState('');
    const user=firebase.auth().currentUser
    //when we load below code will fetch the firebase data
  useEffect(()=>{
  db.collection('todos').doc(user?.uid).collection('user-todo').orderBy('timestamp','desc').onSnapshot(snapshot =>{
    setTodos(snapshot.docs.map(doc =>({id:doc.id,todo:doc.data().todo})))
  })
  // eslint-disable-next-line
  },[]);
  //Below function adds the input value to the page.
    const addTodo=(event)=>{
      event.preventDefault();//Prevents the page to refresh again and again.
      
      db.collection('todos').doc(user?.uid).collection('user-todo').add({
        todo:input,
        timestamp:firebase.firestore.FieldValue.serverTimestamp()
      })
      setTodos([...todos,input])
      setInput('')
    }
    return (
        <div className="home-page">
          <div className="home-page-header">
             <h1 className="header-title">React To-Do App</h1>

             <Button variant="outlined" color="secondary" onClick={()=>auth.signOut()}>Logout</Button>
             </div>
             <p className="user-title">Welcome <strong>{user.displayName}</strong></p>
      {/* We wrap the code in form so that the input get's submitted */}
      <form>
     
      <FormControl>
        <InputLabel>Add a To-Do</InputLabel>
        <Input value={input} onChange={event=>setInput(event.target.value)}/>
      </FormControl>
      <Button disabled={!input} type="submit" onClick={addTodo} variant="contained" color="primary">
      Add Task
</Button>
      
        </form>
      <ul>
        {todos.map(todo=>(
  <ToDo todo={todo}/>
        
  ))}
        
      </ul>
            
        </div>
    )
}

export default Homepage
