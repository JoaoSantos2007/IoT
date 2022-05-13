import { initializeApp } from "firebase/app"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import React from "react";
import {Navigate,useLocation} from "react-router-dom"

import firebaseConfig from './assets/firebase.json'
 
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)


let redirecionar = true
onAuthStateChanged(auth, (user) => {
  if(user){
    console.log('connected')
    redirecionar = false
  }else{
    console.log('no user')
    redirecionar = true
  }
})



function CheckUser(){
  const currentPath = useLocation().pathname
  if(redirecionar === true && currentPath !== '/login'){
    return(
      <Navigate to="/login"/>
    )
  }else{
    return(
      <></>
    )
  }

}

export default CheckUser