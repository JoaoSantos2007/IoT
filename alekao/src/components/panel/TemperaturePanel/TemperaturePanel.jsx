import React from "react";
import "./TemperaturePanel.css"

export const TemperaturePanel = (props) => {
    const device = props.device

    return(
        <div className="TemperaturePanel">
            <p className="TemperaturePanel__temperature"><span>{device.value}</span>ºC</p>
        </div>
    )
}