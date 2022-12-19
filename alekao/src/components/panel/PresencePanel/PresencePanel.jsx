import React from "react";
import "./PresencePanel.css"

export const PresencePanel = (props) => {
    const device = props.device
    return(
        <div className="PresencePanel">
            <p className="PresencePanel__presence"><span>{String(Boolean(Number(device.value)))}</span></p>
        </div>
    )

}