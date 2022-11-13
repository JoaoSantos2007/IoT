import React from "react";
import './NotFound.css'
import {useNavigate} from "react-router-dom";

export const NotFound = () => {
    const navigate = useNavigate()

    const returnPage = () => {
        navigate(-1)
    }

    return(
        <main className="container pageNotFound__container">
            <h1 className="title pageNotFound__text">Web page not found!</h1>
            <button className="returnBtn" onClick={returnPage}>Back</button>
        </main>
    )
}