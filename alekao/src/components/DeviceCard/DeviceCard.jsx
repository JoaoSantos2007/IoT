import React from "react";
import { useNavigate } from "react-router-dom";
import { DeviceIcon } from "../DeviceIcon/DeviceIcon";
import "./DeviceCard.css"

export const DeviceCard = (props) => {
    const navigate = useNavigate()

    const clicked = () => {
        navigate(`/device/${props.id}`)
    }
    
    return(
        <section className="deviceCard" onClick={clicked}>
                <div className="colorID" style={{"backgroundColor":props.colorID}}/>
                <div className="deviceIMG">
                    <DeviceIcon type={props.type}/>
                </div>
                <p className="nome">{props.name}</p>
                <p className="locationID">{props.locationID}</p>
        </section>
    )
}