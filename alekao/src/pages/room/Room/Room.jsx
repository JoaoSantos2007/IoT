import React,{ useEffect,useState } from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import './Room.css'
import api from '../../../assets/services/api.js'
import DeviceCard from '../../../components/device/DeviceCard'

import editIcon from '../../../assets/icon/edit.svg'
import deleteIcon from "../../../assets/icon/delete.svg"

import Loader from '../../../components/Loader'

export const Room = () => {
    const navigate = useNavigate()
    const id = (useParams("id")).id;

    const [room,setRoom] = useState()

    useEffect(() => {
        api.get(`/rooms/${id}`)
        .then((res) => {
            const data = res.data
            setRoom(data)
        })
        .catch((err) => {
            console.error(err.message)
        })
    },[id])

    const editRoom = () => {
        navigate(`/room/update/${room.id}`)
    }

    const deleteRoom = () => {
        const toDelete = window.confirm("Delete this room")
        if(toDelete){
            api.delete(`/rooms/${id}`)
            .then((res) => {
                navigate(-1)
            })
            .catch((err) => {
                console.error(err)
            })
        }
    }

    const copyRoomID = () => {
        if ('clipboard' in navigator) {
            navigator.clipboard.writeText(room.id);
        }
    }

    if(!room) return <Loader />

    return(
        <>
            <main className='container'>
                <section className='container__header' style={{"background":room.colorID}}>
                    <p className='container__name'>{room.name}</p>                    
                </section>

                <p className='room__id' onClick={copyRoomID}>copy roomID</p>
                

                <section className='room__header'>
                    <div className="room__controls">
                        <img src={editIcon} alt="edit room" onClick={editRoom}/>
                        <img src={deleteIcon} alt="delete room" onClick={deleteRoom}/>
                    </div>       
                </section>
                
                <section className='room__main'>
                    {room.devices.map((device) => {
                        return(<DeviceCard key={`${device.id}_Room`} id={device.id} name={device.name} type={device.type} value={device.value} colorID={device.colorID}/>)
                    })}
                </section>
            </main>
        </>
    )
}