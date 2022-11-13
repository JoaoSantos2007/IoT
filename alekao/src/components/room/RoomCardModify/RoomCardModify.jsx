import React, {useState} from "react"
import { useNavigate } from "react-router-dom"
import './RoomCardModify.css'

import cancelIcon from "../../../assets/icon/cancel.svg"
import confirmIcon from "../../../assets/icon/confirm.svg"


export const RoomCardModify = (props) => {
    const navigate = useNavigate()

    const room = props.room ? props.room : {
        "name":"",
        "colorID": ""
    }

    const [name,setName] = useState(room.name)
    const [colorID,setColorID] = useState(room.colorID)


    function cancel(){
        navigate(-1)
    }

    function save(){
        const data = {
            name,
            colorID
        }

        props.save(data)
    }

    function alterName(event){
        setName(event.target.value)
    }

    function alterColor(event){
        setColorID(event.target.value)
    }


    return(
        <>
            <section className="roomCardModify">
                <div className="roomCardModify__main">
                    <input type="color" onChange={alterColor} className="roomCardModify__color" value={colorID} />
                    <input type="text" onChange={alterName} className="roomCardModify__name" placeholder="Room Name" value={name} />
                </div>

                <hr />

                <div className="roomCardModify__footer">
                    <img src={cancelIcon} alt="cancel" onClick={cancel}/>
                    <img src={confirmIcon} alt="confirm" onClick={save}/>
                </div>
            </section>
        </>
    )
}