import React,{useEffect,useState} from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./UpdateRoom.css"

import RoomCardModify from "../../../components/room/RoomCardModify";
import api from "../../../assets/services/api.js";

export const UpdateRoom = () => {
    const navigate = useNavigate()
    const [room,setRoom] = useState()
    
    const id = (useParams("id")).id

    const onSave = (data) => {
        api.put(`/rooms/${id}`,data)
        .then((res) => {
            navigate(-1)
        })
        .catch((err) => {
            console.log(err)
        })   
    }

    useEffect(()=>{
        api.get(`rooms/${id}`)
        .then((res) => {
            setRoom(res.data)
        })
        .catch((err) => {
            console.log(err)
        })
    },[])

    if(!room) return ""

    return(
        <>
            <main className="UpdateRoom_Main">
                <h1>Update Room</h1>
                <RoomCardModify save={onSave} id={id} room={room}/>

            </main>
        </>
    )
}