import React from "react";
import { Routes, BrowserRouter as Router,Route} from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login"
import Credits from "./pages/Credits";
import Cloud from "./pages/Cloud";
import CheckUser from './checkUser.js'

function Rotas(){
    return(
        <Router>
            <Routes>
                <Route path="/cloud" element = {<Cloud/>} />
                <Route path="/" element = {<Home/>} />
                <Route path="/credits" element = {<Credits/>} />
                <Route path="/login" element = {<Login/>} />
            </Routes>

            <CheckUser/>
        </Router>
    )
}

export default Rotas;