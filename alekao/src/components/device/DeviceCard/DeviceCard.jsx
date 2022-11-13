import React from "react";
import { useNavigate } from "react-router-dom";
import { getDeviceIcon } from "../../../assets/services/device.js";
import "./DeviceCard.css"

export const DeviceCard = (props) => {
    const navigate = useNavigate()

    const clicked = () => {
        navigate(`/device/${props.id}`)
    }
    
    return(
        <section className="deviceCard" onClick={clicked}>
                <img className="deviceCard__img" src={getDeviceIcon(props.type)} alt="device type icon" />
                <p className="deviceCard__name">{props.name}</p>
        </section>
    )
}