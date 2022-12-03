import React from "react";
import "./HumidityPanel.css"

export const HumidityPanel = (props) => {
    const device = props.device
    return(
        <div className="HumidityPanel">
            <p className="HumidityPanel__humidity"><span>{device.value}</span>%</p>
        </div>
    )    
}