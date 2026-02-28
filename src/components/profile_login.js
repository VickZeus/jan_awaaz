"use client"
import {useRouter} from "next/navigation"
import style from "../styles/homepage.module.css"


export default function Option3({user}){
    const router=useRouter()
    if(!user){
        return <button className={style.OptButton} onClick={()=>router.push("/login")}>Login</button>
    }
    else{
        return <button className={style.OptButton} onClick={()=>router.push("/profile")}>Profile</button>
    }
}