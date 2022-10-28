import React,{useState,useEffect} from 'react'
import './Home.css'
import RoomCard from '../../components/RoomCard'
import addImg from '../../assets/add.png'
import {Link} from 'react-router-dom'
import api from '../../services/api.js'

export const Home = () => {
    const [cards,setCards] = useState([{}])
    useEffect(() => {
        api
        .get("/rooms")
        .then((res) => {
            setCards(res.data)
        })
        .catch((err) => {
            console.log(err)
        })
    },[])

    return(
        <>
            <main className='mainContent'>
                <h1>IOT Home</h1>
                <section className='cards'>
                    {cards.map((room) => {
                        return <RoomCard key={room.id} id={room.id} nome={room.name} local={room.location} colorID={room.colorID} />
                    })}
                </section>
                <Link to='/room/add' className='addRoomBTN'>
                    <img src={addImg} alt="Create room btn img"/>
                </Link>
            </main>

        </>

    )
}