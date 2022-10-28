import React from "react"
import { Link } from "react-router-dom"
import "./NavBarItems.css"


export const NavBarItems = (props) => {
    const type = props.type
    const imagem = props.imagem
    const text = type.charAt(0).toUpperCase() + type.slice(1)
    const mode = props.mode
    

    if(mode === 'retract'){
        return(
            <Link className="items" to={'/'+type}>
                <img src={imagem} alt=""/>
            </Link>
        )
    }else{
        return(
            <Link className="items" to={'/'+type}>
                <img src={imagem} alt=""/>
                <p>{text}</p>
            </Link>
        )
    }
}