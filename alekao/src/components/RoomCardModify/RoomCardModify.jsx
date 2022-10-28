import React from "react"
import './RoomCardModify.css'
import confirmIMG from "../../assets/confirm.png"
import cancelIMG from "../../assets/cancel.png"
import { useNavigate } from "react-router-dom"
import { useState } from "react"

export const RoomCardModify = (props) => {
    const navigate = useNavigate()

    const getRoom = () => {
        if(props.room){
            return props.room
        }else{
            return {} 
        }
    }
    
    const room = getRoom()

    const [name,setName] = useState(room.name)
    const [location,setLocation] = useState(room.location)
    const [colorID,setColorID] = useState(room.colorID)

    const alterColorID = (event) => {
        setColorID(event.target.value)
    }

    const alterName = (event) => {
        setName(event.target.value)
    }

    const alterLocation = (event) => {
        setLocation(event.target.value)
    }
    
    const confirm = () => {

        const data = {
            "name": name,
            "location": location,
            "colorID": colorID
        }

        props.save(data)
    }

    const cancel = () => {
        navigate(-1)
    }

    return(
        <section className="cardModify">
            <div className="cardModify_main">
                <div className="colorIdField">
                    <input type="color" id="inputColorID" onChange={alterColorID} className="colorIdField" value={colorID}/>
                </div>
                
                <input type="text" id="inputName" onChange={alterName} className="nomeField" placeholder="Nome" value={name}/>
                <input type="text" id="inputLocation" onChange={alterLocation} className="localField" placeholder="Local" value={location}/>
            </div>
            <div className="cardModify_footer">
                <img className="confirmIMG" src={confirmIMG} alt="confirm btn" onClick={confirm} />
                <img className="cancelIMG" src={cancelIMG} alt="cancel btn" onClick={cancel} />
            </div>

        </section>
    )
}