import React from 'react'
import "./LightPanel.css"

export const LightPanel = () => {
    return(
        <div className='lightPanel__btn'>
            <label className="switch">
                <input type="checkbox" />
                <span className="slider round"></span>
            </label>   
        </div>

    )
}