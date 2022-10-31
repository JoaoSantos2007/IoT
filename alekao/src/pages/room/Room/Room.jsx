import React,{ useEffect,useState } from 'react'
import {Link, useNavigate, useParams} from 'react-router-dom'
import './Room.css'
import api from '../../../assets/services/api.js'
import DeviceCard from '../../../components/device/DeviceCard'

import editIcon from '../../../assets/img/edit.png'
import deleteIcon from "../../../assets/img/delete.png"

export const Room = () => {
    const id = (useParams("id")).id;

    const [room,setRoom] = useState({})
    const [devices,setDevices] = useState([{}])

    const navigate = useNavigate()

    useEffect(() => {
        api.get(`/rooms/${id}`)
        .then((res) => {
            setRoom(res.data)
            setDevices(res.data.devices)
            console.log(res.data.devices)
        })
        .catch((err) => {
            console.log(err)
        })
    })

    const deleteRoom = () => {
        const toDelete = window.confirm("Delete this room")
        if(toDelete){
            console.log('delete')
            api.delete(`/rooms/${id}`)
            .then((res) => {
                navigate(-1)
            })
            .catch((err) => {
                console.log(err)
            })
        }
    }


    return(
        <>
            <main className='container'>
                <section className='roomHeader' style={{"background":room.colorID}}>
                    <p>{room.name}</p>
                    <div className='controlRoom'>
                        <Link to={`/room/update/${id}`} className='editIcon'>
                            <img src={editIcon} alt="edit icon" />
                        </Link>
                        <div className='deleteIcon'>
                            <img src={deleteIcon} alt="delete icon" onClick={deleteRoom}/>
                        </div>
                        
                    </div>
                    
                </section>
                
                <section className='roomBody'>
                    {devices.map((device) => {
                        return(<DeviceCard key={device.id} id={device.id} name={device.name} type={device.type} value={device.value} colorID={device.colorID}/>)
                    })}
                </section>
            </main>
        </>
    )
}