import React from 'react'
import FanPanel from '../FanPanel'
import LightPanel from '../LightPanel'
import TvPanel from '../TvPanel'
import "./Panel.css"



export const Panel = (props) => {
    const getPanel = (type) => {
        let panel = ""

        switch(type){
            case "light":
                panel=<LightPanel />
                break
            case "tv":
                panel=<TvPanel />
                break
            case "fan":
                panel=<FanPanel />
                break
            default:
                panel=''
        }

        return panel
    }

    return(
        <section className='panel'>
            {getPanel(props.type)}
        </section>
    )
}