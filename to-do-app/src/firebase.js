import firebase from 'firebase'

const firebaseApp=firebase.initializeApp({
    
        apiKey: "AIzaSyCub4L5OckACmTj7wQ6ZFqblAuAlkFiMAg",
        authDomain: "to-do-react-818f9.firebaseapp.com",
        projectId: "to-do-react-818f9",
        storageBucket: "to-do-react-818f9.appspot.com",
        messagingSenderId: "59804265305",
        appId: "1:59804265305:web:f160a793ce4b996b6c7a48"
      

});
const db=firebaseApp.firestore();
const auth=firebase.auth()
export  {db,auth};