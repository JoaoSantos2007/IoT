import React, {useState} from "react"
import { useNavigate } from "react-router-dom"
import './RoomCardModify.css'

export const RoomCardModify = (props) => {
    const navigate = useNavigate()

    class alter{
        static name(event){
            setName(event.target.value)
        }

        static colorID(event){
            setColorID(event.target.value)
        }

        static id(event){
            setID(event.target.value)
        }
    }
    

    const room = props.room ? props.room : {
        "id": "",
        "name":"",
        "colorID": ""
    }

    const [id,setID] = useState(room.id)
    const [name,setName] = useState(room.name)
    const [colorID,setColorID] = useState(room.colorID)


    function cancel(){
        navigate(-1)
    }

    function save(event){
        event.preventDefault()
        
        const data = {
            name,
            colorID
        }

        props.save(data)
    }


    return(
        <>
            <form className="roomForm" onSubmit={save}>
                <input type="text" onChange={alter.id} className="roomForm__id" placeholder="randomID" value={id} />
                <input type="text" onChange={alter.name} className="roomForm__name" placeholder="name" value={name} />
                <input type="color" onChange={alter.colorID} className="roomForm__color" value={colorID} />
                

                <div className="deviceForm__footer">
                    <input className="deviceForm__submit" type="submit" value="Done"/>
                    <input className="deviceForm__cancel" type="button" value="Cancel" onClick={cancel}/>
                </div>
            </form>
        </>
    )
}