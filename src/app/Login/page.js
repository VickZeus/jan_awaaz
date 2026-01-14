"use client"

import style from "@/styles/loginpage.module.css"
import style2 from "@/styles/homepage.module.css"
import Image from "next/image"
import {LogoAndTitle} from "@/app/page"
import {signIn,useSession} from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage(){
    const {data:session,status}=useSession();
    const router=useRouter();

    useEffect(()=>{
    if(status==="authenticated"){
        router.replace("/HomePage");
    }
    },[status,router])

    return(
        <div className={`${style.container} ${style2.col_flex}`}>
            <LogoAndTitle styleExtra={{alignSelf:"center",color:"white"}}/>
                <div className={`${style2.col_flex}`} style={{backgroundColor:"black",borderRadius:"5px",alignItems:"center",width:"100%"}}>
                    <Image src="/LoginIMG.png" alt="RandomImage" width={120} height={120}/>
                    <div className={`${style2.col_flex}`}>
                        <button onClick={()=>signIn("google")}>LogIn Using Google</button>
                        <button onClick={()=>signIn("github")}>LogIn Using Github</button>
                        <button onClick={()=>signIn("facebook")}>LogIn Using Facebook</button>
                    </div>
                </div>
        </div>
    )
}