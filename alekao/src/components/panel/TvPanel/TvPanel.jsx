import React from 'react'
import "./TvPanel.css"

import upIcon from "../../../assets/icon/up.svg"
import downIcon from "../../../assets/icon/down.svg"

import addIcon from "../../../assets/icon/add.svg"
import removeIcon from "../../../assets/icon/remove.svg"

import northIcon from "../../../assets/icon/north.svg"
import southIcon from "../../../assets/icon/south.svg"
import westIcon from "../../../assets/icon/west.svg"
import eastIcon from "../../../assets/icon/east.svg"

import powerIcon from '../../../assets/icon/power.svg'
import menuIcon from '../../../assets/icon/menu.svg'
import undoIcon from '../../../assets/icon/undo.svg'

export const TvPanel = () => {
    return(
        <div className='tvPanel'>
            <div className='tvPanel__config'>
                <img src={powerIcon} alt="power tv" />
                <img className='tvPanel__config__center' src={menuIcon} alt="menu tv" />
                <img src={undoIcon} alt="back tv" />
            </div>

            <div className='tvPanel__remote'>
                <div className='tvPanel__remote__content'>
                    <div className='tvPanel__remote__part1'>
                        <img src={northIcon} alt="north remote" />
                    </div>

                    <div className='tvPanel__remote__part2'>
                        <img src={westIcon} alt="west remote"/>
                        <p>OK</p>
                        <img src={eastIcon} alt="east remote" />
                    </div>

                    <div className='tvPanel__remote__part3'>
                        <img src={southIcon} alt="south remote" />
                    </div>
                </div>
            </div>

            <div className='tvPanel__channel'>
                <img src={upIcon} alt="next channel" />
                <p>Channel</p>
                <img src={downIcon} alt="previous channel" />
            </div>

            <div className='tvPanel__volume'>
                <img src={addIcon} alt="up volume" />
                <p>Volume</p>
                <img src={removeIcon} alt="down volumer" />
            </div>
        </div>
    )
}