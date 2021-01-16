import React,{useState,useEffect} from 'react'
import './App.css';
import { Button, InputLabel,FormControl,Input} from '@material-ui/core'
import Todo from './ToDo.js'
import db from './firebase'
import firebase from 'firebase'
function App() {
  const [todos,setTodos]=useState([]);
  const [input,setInput]=useState('');
  //when we load below code will fetch the firebase data
useEffect(()=>{
db.collection('todos').orderBy('timestamp','desc').onSnapshot(snapshot =>{
  setTodos(snapshot.docs.map(doc =>({id:doc.id,todo:doc.data().todo})))
})
},[]);
//Below function adds the input value to the page.
  const addTodo=(event)=>{
    event.preventDefault();//Prevents the page to refresh again and again.
    
    db.collection('todos').add({
      todo:input,
      timestamp:firebase.firestore.FieldValue.serverTimestamp()
    })
    setTodos([...todos,input])
    setInput('')
  }
  return (
    <div className="App">
      <h1 className="header-title">React To-Do App</h1>
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
  <Todo todo={todo}/>
        
  ))}
        
      </ul>
    </div>
  );
}

export default App;
