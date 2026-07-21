"use client"
import {useRouter} from "next/navigation"
import style from "../styles/homepage.module.css"
import Image from "next/image"
import {useState} from "react"



export default function Option3({user,pfp}){
    const [open,setOpen]=useState(false)
    const router=useRouter()

    async function handleLogout(){
        const response= await fetch("/api/logout",{
            method:"POST"
        })

        if(response.ok){
            router.push("/")
        }
    }


    if(!user){
        return <button className={style.OptButton} onClick={()=>router.push("/login")}>Login</button>
    }
    else{
        return (
        <div className="relative inline-block">
                
        <button className={style.pfpButton} onClick={() => setOpen(!open)}>
            <Image className={style.pfp} src={pfp} width={30} height={30} alt="Profile"/>
        </button>

        {open && (
            <div className="absolute flex flex-col text-sm items-end right-0 mt-2 w-25 bg-black border border-gray-600 rounded shadow">
            <button className="w-full text-right block text-white py-2 px-2 hover:bg-gray-100 hover:text-black">
                Edit Profile
            </button>

            <button className="w-full text-right block text-red-500 py-2 px-2 hover:bg-red-500 hover:text-white" onClick={handleLogout}>
                Log Out
            </button>
            </div>
        )}
        </div>
        );    
    }
}

export function ReportPage(){
    const router=useRouter()
    return <button className={style.OptButton} onClick={()=>router.push("/report")}>Report</button>
}