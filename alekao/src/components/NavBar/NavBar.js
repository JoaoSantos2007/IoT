import React from "react"
import Logo from "../Logo"
import NavBarItems from "../NavBarInputs"
import "./NavBar.css"
import { useState } from "react"
import homeIMG from '../../assets/home.png'
import dashboardIMG from '../../assets/dashboard.png'
import deviceIMG from '../../assets/device.png'
import packagesIMG from '../../assets/packages.png'
import tasksIMG from '../../assets/tasks.png'
import eventsIMG from '../../assets/events.png'
import messagesIMG from '../../assets/messages.png'
import settingsIMG from '../../assets/settings.png'
import accountIMG from '../../assets/account.png'
import retractIMG from '../../assets/retract.png'
import extendImg from '../../assets/extend.png'

export const NavBar = () => {
    const [mode,setMode] = useState('retract')

    const click = () => {
        if(mode === 'retract'){
            setMode('extend')
        }else{
            setMode('retract')
        }
    }

    const getModeIcon = () => {
        if(mode === 'retract') return retractIMG
        else return extendImg
    }

    return(
        <nav className="NavBar">
            <Logo mode={mode}/>
            <NavBarItems type="home" mode={mode} imagem={homeIMG}/>
            <NavBarItems type="dashboard" mode={mode} imagem={dashboardIMG}/>
            <NavBarItems type="devices" mode={mode} imagem={deviceIMG}/>
            <NavBarItems type="packages" mode={mode} imagem={packagesIMG}/>
            <NavBarItems type="tasks" mode={mode} imagem={tasksIMG}/>
            <NavBarItems type="events" mode={mode} imagem={eventsIMG}/>
            <NavBarItems type="messages" mode={mode} imagem={messagesIMG}/>
            <hr />
            <NavBarItems type="settings" mode={mode} imagem={settingsIMG}/>
            <NavBarItems type="account" mode={mode} imagem={accountIMG}/>
            <img className="changeMode" src={getModeIcon()} onClick={click} alt=""/>
        </nav>

    )
}