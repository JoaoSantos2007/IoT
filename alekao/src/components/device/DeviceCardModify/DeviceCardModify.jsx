import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
import "./DeviceCardModify.css"

import confirmIMG from "../../../assets/img/confirm.png"
import cancelIMG from "../../../assets/img/cancel.png"

export const DeviceCardModify = (props) => {
    const navigate = useNavigate()

    const device = props.device ? props.device : {}

    const [name,setName] = useState(device.name)
    const [colorID,setColorID] = useState(device.colorID)
    const [locationID,setLocationID] = useState(device.locationID)
    const [type,setType] = useState(device.type)

    const confirm = () => {
        const data = {
            "name": name,
            "type": type,
            "colorID": colorID,
            "locationID": locationID
        }
        
        props.save(data)
    }

    const cancel = () => {
        navigate(-1)
    }

    const alterName = (event) => {
        setName(event.target.value)
    }

    const alterLocationID = (event) => {
        setLocationID(event.target.value)
    }

    const alterColorID = (event) => {
        setColorID(event.target.value)
    }

    const alterType = (event) => {
        setType(event.target.value)
    }

    return(
        <section className="DeviceCardModify">
            <main>
                <input type="color" onChange={alterColorID} className="colorIDField" value={colorID}/>
                <input type="text" onChange={alterType} className="typeField" placeholder="Type" value={type}/>
                <input type="text" onChange={alterName} className="nameField" placeholder="Nome" value={name}/>
                <input type="text" onChange={alterLocationID} className="locationIDField" placeholder="locationID" value={locationID}/>
            </main>
            <footer>
                <img className="confirmIMG" src={confirmIMG} alt="confirm btn" onClick={confirm} />
                <img className="cancelIMG" src={cancelIMG} alt="cancel btn" onClick={cancel} />
            </footer>
        </section>
    )
}