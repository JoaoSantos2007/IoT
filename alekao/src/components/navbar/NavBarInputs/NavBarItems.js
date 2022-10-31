import React from "react"
import {useNavigate} from "react-router-dom"
import "./NavBarItems.css"


export const NavBarItems = (props) => {
    const navigate = useNavigate()

    const type = props.type
    const img = props.img
    const text = type.charAt(0).toUpperCase() + type.slice(1)

    const toLink = () => {
        navigate(`/${type}`)
    }
    
    return(
        <div className="icon" onClick={toLink}>
            <img className="icon__img" src={img} alt={`${text} icon`}/>
            <p className="icon__text">{text}</p>
        </div>
    )
}