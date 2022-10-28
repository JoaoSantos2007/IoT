import React from "react"
import './Logo.css'
import logoIMG from '../../assets/iot_64px.png'

export const Logo = (props) => {
    const mode = props.mode

    if(mode === 'retract'){
        return(
            <div className="logo">
                <img src={logoIMG} alt="logo" />
            </div>
        )
    }else{
        return(
            <div className="logo">
                <img src={logoIMG} alt="logo" />
                <h1>IOT</h1>
            </div>
        )
    }
}