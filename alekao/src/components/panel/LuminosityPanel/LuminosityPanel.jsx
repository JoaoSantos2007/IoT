import React from "react"
import "./LuminosityPanel.css"

export const LuminosityPanel = (props) => {
    const device = props.device
    
    return(
        <div className="LuminosityPanel">
            <p className="LuminosityPanel__luminosity"><span>{device.value}</span></p>
        </div>
    )
}