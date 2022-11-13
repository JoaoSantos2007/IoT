import React,{ useEffect,useState } from 'react'
import {Link, useNavigate, useParams} from 'react-router-dom'
import './Room.css'
import api from '../../../assets/services/api.js'
import DeviceCard from '../../../components/device/DeviceCard'

import editIcon from '../../../assets/icon/edit.svg'
import deleteIcon from "../../../assets/icon/delete.svg"

import westIcon from "../../../assets/icon/west.svg"

import Loader from '../../../components/Loader'

export const Room = () => {
    const id = (useParams("id")).id;

    const [room,setRoom] = useState()

    const navigate = useNavigate()

    useEffect(() => {
        api.get(`/rooms/${id}`)
        .then((res) => {
            setRoom(res.data)
        })
        .catch((err) => {
            console.error(err.message)
        })
    })

    const back = () => {
        navigate(-1)
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

    if(!room) return <Loader />


    return(
        <>
            <main className='container'>
                <section className='container__header' style={{"background":room.colorID}}>
                    <img className='container__back' src={westIcon} alt="back" onClick={back}/>
                    <p className='container__name'>{room.name}</p>                    
                </section>

                <p className='room__id'>{room.id}</p>

                <section className='room__control'>
                        <Link to={`/room/update/${id}`} className='editIcon'>
                            <img src={editIcon} alt="edit icon" />
                        </Link>
                        <div className='deleteIcon'>
                            <img src={deleteIcon} alt="delete icon" onClick={deleteRoom}/>
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