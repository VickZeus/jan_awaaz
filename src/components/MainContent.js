"use client"
import {useState} from "react"
import {useRouter} from "next/navigation"
import style from "../styles/homepage.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {faArrowTrendUp,faFire,faLocationDot,faAlarmClock} from "@fortawesome/free-solid-svg-icons"

function JoinICON({icon,title}){
    return(
        <div className={style.join_icon}>
            <FontAwesomeIcon icon={icon} style={{fontSize:"16px"}}/>
            <span>{title}</span>
        </div>
    )
}

function Options(){
    return(
        <div className={style.rowFlex}>
            <JoinICON icon={faArrowTrendUp} title={"Trending"}/>
            <JoinICON icon={faAlarmClock} title={"Recent"}/>
            <JoinICON icon={faLocationDot} title={"Near Me"}/>
            <JoinICON icon={faFire} title={"Popular"}/>
        </div>
    )
}

export default function MainPage(){
    return(
        <div className={style.mainContent}>
            <div className={style.containerMP}>
                <Options/>
            </div>
        </div>
    )
}