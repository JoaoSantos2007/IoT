import React from "react";
import "./RoomCard.css"
import {useNavigate} from "react-router-dom";

export const RoomCard = (props) => {
    const navigate = useNavigate()
    const clicked = () => {
        navigate(`/room/${props.id}`)
    }

    return(
        <section className="roomCard" onClick={clicked}>
                <div className="roomCard__color" style={{"backgroundColor":props.colorID}}/>
                <p className="roomCard__name">{props.nome}</p>
        </section>
    )
}