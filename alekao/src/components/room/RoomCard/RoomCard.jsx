import React from "react";
import "./RoomCard.css"
import {useNavigate} from "react-router-dom";

export const RoomCard = (props) => {
    const navigate = useNavigate()
    const clicked = () => {
        navigate(`/room/${props.id}`)
    }

    return(
        <section className="RoomCard" onClick={clicked}>
                <div className="colorID" style={{"backgroundColor":props.colorID}}/>
                <p className="nome">{props.nome}</p>
                <p className="local">{props.local}</p>
        </section>
    )
}