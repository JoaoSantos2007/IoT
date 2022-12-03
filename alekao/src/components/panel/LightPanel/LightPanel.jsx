import React from 'react'
import api from '../../../assets/services/api.js'
import "./LightPanel.css"

export const LightPanel = (props) => {
    const device = props.device
    const value = Boolean(Number(device.value))

    const updateLigthValue = () => {
        const event = {
            "type": "action-sensor",
            "deviceID": device.id,
            "tag": "#lightBTN"
        }

        api.post("/events", event)
        .then((res) => {
            console.log(res.data)
        })
        .catch((err) => {
            console.error(err)
        })
    }

    return(
        <div className='lightPanel__btn'>
            <label className="switch">
                <input type="checkbox" checked={value} onChange={updateLigthValue}/>
                <span className="slider round"></span>
            </label>   
        </div>

    )
}