"use client"
import {useRouter} from "next/navigation"
import style from "../styles/homepage.module.css"
import Image from "next/image"


export default function Option3({user,pfp}){
    const router=useRouter()
    if(!user){
        return <button className={style.OptButton} onClick={()=>router.push("/login")}>Login</button>
    }
    else{
    //     return <button className={style.OptButton} onClick={()=>router.push("/profile")}>Profile</button>
    // }
        return <Image className={style.pfp} src={pfp} width={30} height={30} alt="logo"></Image>
    }
}