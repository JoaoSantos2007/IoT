import React from "react"
import { useNavigate } from "react-router-dom"
import './CreateRoom.css'

import RoomCardModify from "../../../components/room/RoomCardModify"
import api from "../../../assets/services/api.js"


export const CreateRoom = () => {
    const navigate = useNavigate()

    const saveData = (data) => {
        api.post("/rooms",data)
        .then((res) => {
            navigate(-1)
        })
        .catch((err) => {
            console.error(err)
        })   
    }

    return(
        <>
            <main className="container">
                <div className="container__header">
                    <h1 className="container__name">Create Room</h1>
                </div>

                <section className="createRoom__container">
                    <RoomCardModify save={saveData}/>
                </section>                
            </main>
        </>
    )
}