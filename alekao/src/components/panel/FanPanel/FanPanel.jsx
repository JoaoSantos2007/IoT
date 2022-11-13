import React from "react"
import "./FanPanel.css"

import powerIcon from "../../../assets/icon/power.svg"
import invertIcon from "../../../assets/icon/invert.svg"

import upIcon from "../../../assets/icon/up.svg"
import downIcon from "../../../assets/icon/down.svg"

export const FanPanel = () => {
    return(
        <div className="fanPanel">
            <div className="fanPanel__config">
                <img src={powerIcon} alt="power" />
                <img src={invertIcon} alt="invert" />
            </div>

            <div className="fanPanel__speed">
                <img src={upIcon} alt="up" />
                <img src={downIcon} alt="down" />
            </div>
        </div>
    )
}