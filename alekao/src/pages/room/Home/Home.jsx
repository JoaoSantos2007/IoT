import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import './Home.css'

import RoomCard from '../../../components/room/RoomCard'
import addImg from '../../../assets/icon/add.svg'
import api from "../../../assets/services/api.js"
import Loader from '../../../components/Loader'

export const Home = () => {
    const [rooms,setRooms] = useState()
    
    useEffect(() => {
        api.get("/rooms")
        .then((res) => {
            setRooms(res.data)
        })
        .catch((err) => {
            console.error(err)
        })
    },[])

    if(!rooms){
        return(<Loader />)
    }

    return(
        <>
            <main className='container'>
                <div className='container__header'>
                    <h1 className='container__name'>Home</h1>
                </div>

                <Link to='/room/create' className='createRoom__btn'>
                    <img src={addImg} className='createRoom__img' alt='create room btn'/>
                </Link>
                
                <section className='roomCards'>
                    {rooms.map((room) => {
                        return <RoomCard key={`room_${room.id}`} id={room.id} nome={room.name} local={room.location} colorID={room.colorID} />
                    })}
                </section>
            </main>
        </>
    )
}