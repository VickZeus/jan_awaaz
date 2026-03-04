"use client"
import {useRouter} from "next/navigation"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {faCircleArrowLeft} from "@fortawesome/free-solid-svg-icons"
import style from "@/styles/reportpage.module.css"

function JoinICON({icon}){
    const router=useRouter();
    return(
        <button className={style.back_button} onClick={()=>router.push("/")}>
            <FontAwesomeIcon icon={icon} style={{fontSize:"32px",marginTop:"10px",marginLeft:"10px"}}/>
        </button>
    )
}




export default function GetBack(){
    return <JoinICON icon={faCircleArrowLeft} />
}