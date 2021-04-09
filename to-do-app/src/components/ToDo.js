//rfce

import React,{useState} from 'react'
import {List,ListItem,ListItemAvatar,ListItemText, Modal,Button,Input} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import CancelIcon from '@material-ui/icons/Cancel';
import './ToDo.css'

import {makeStyles} from '@material-ui/core/styles'
import firebase from 'firebase'
import { db } from '../firebase';
const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));
function ToDo(props) {
    const classes=useStyles();
  const [open,setOpen]=useState(false);
  const [input,setInput]=useState('');
  const user=firebase.auth().currentUser
  const handleOpen=()=>{
      setOpen(true)
  }
  const handleClose=()=>{
      setOpen(false)
  }

  // Update a data in Firebase
  const updateTodo=()=>{
  db.collection('todos').doc(user?.uid).collection('user-todo').doc(props.todo.id).set({
    todo:input
  },{merge:true})
    setOpen(false)
}
  const t = firebase.firestore.Timestamp.fromDate(new Date());

  // Timestamp to Date
  const currentdate = t.toDate();
  //var currentdate = new Date(); 
  var datetime = "Date: " + currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() 
    return (
        <>
        <Modal open={open} onClose={handleClose} className="modal">
            <div className={classes.paper}>
            <CancelIcon onClick={handleClose} color="secondary"></CancelIcon>
            <h2>Update To-Do</h2>
            <Input placeholder={props.todo.todo} value={input} onChange={event=> setInput(event.target.value)}/>
           <Button onClick={updateTodo} color="primary" variant="contained">Update</Button>
            </div>
        </Modal>
        <List>
            <ListItem>
                <ListItemAvatar>
                  
                </ListItemAvatar>
           <ListItemText primary={props.todo.todo} secondary={datetime} />
           </ListItem>
           <EditIcon onClick={handleOpen} color="primary" className="edit_button">Edit Me</EditIcon>
            <DeleteIcon onClick={event=>db.collection('todos').doc(user?.uid).collection('user-todo').doc(props.todo.id).delete()} color="secondary" className="delete"></DeleteIcon>
        </List>
        
       </>
            
        
    )
}

export default ToDo
