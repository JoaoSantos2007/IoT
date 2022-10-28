import React from "react";
import './NotFound.css'
import imagem from '../../assets/404.png'
import {useNavigate} from "react-router-dom";

export const NotFound = () => {
    const navigate = useNavigate()

    return(
        <section className="error404">
            <button className="return" onClick={()=>{navigate(-1)}}>
                <p>Back</p>
            </button>
            <div>
                <img src={imagem} alt='Page not found'/>
                <h1>Page not found, error 404!</h1>
            </div>
        </section>
    )
}