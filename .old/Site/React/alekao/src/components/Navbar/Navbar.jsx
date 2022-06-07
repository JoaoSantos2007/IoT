import React,{Component} from "react";
import "./Navbar.css";
import addImage from "../../assets/add.png"
import configImage from "../../assets/config.png"
import {Link} from 'react-router-dom'

class Menu extends Component{
    render(){
        return(
            
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/cloud">Cloud</Link></li>
                    <li><Link to="/credits">Credits</Link></li>
                    <li><a  href="createRecord/create.html"><img src={addImage} alt="agem ancorada para a tela de criação de registros"/></a></li>
                    <li><a href="config/config.html"><img src={configImage} alt="Imagem ancorada para a tela de configuração do usuário"/></a></li>
                </ul>
            </nav>

        )
    }
}

export default Menu