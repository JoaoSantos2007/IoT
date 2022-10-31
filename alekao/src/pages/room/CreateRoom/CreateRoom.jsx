import React from "react"
import { useNavigate } from "react-router-dom"
import './CreateRoom.css'

import RoomCardModify from "../../../components/room/RoomCardModify"
import api from "../../../assets/services/api.js"


export const CreateRoom = () => {
    const navigate = useNavigate()
    const onSave = (data) => {
        api.post("/rooms",data)
        .then((res) => {
            navigate(-1)
        })
        .catch((err) => {
            console.log(err)
        })   
    }

    return(
        <>
            <main className="CreateRoom_Main">
                <h1>New Room</h1>
                <RoomCardModify save={onSave}/>

            </main>
        </>
    )
}