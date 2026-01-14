"use client"

import style from "@/styles/loginpage.module.css"
import style2 from "@/styles/homepage.module.css"
import Image from "next/image"
import {LogoAndTitle} from "@/app/page"
import {signIn,useSession} from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle,faGithub,faFacebook } from "@fortawesome/free-brands-svg-icons";


function LoginOptions(){
    return(
        <div className={`${style2.col_flex}`} style={{gap:"10px"}}>
            <button onClick={()=>signIn("google")} className={style.option}><FontAwesomeIcon icon={faGoogle}/>LogIn Using Google</button>
            <button onClick={()=>signIn("github")} className={style.option}><FontAwesomeIcon icon={faGithub}/>LogIn Using Github</button>
            <button onClick={()=>signIn("facebook")} className={style.option}><FontAwesomeIcon icon={faFacebook}/>LogIn Using Facebook</button>
        </div>
    )
}

function SignupOption(){
    return(
        <div className={style2.col_flex} style={{color:"white",textAlign:"center"}}>
        <div>Sign In</div>
        <form className={style2.col_flex} >
            <input type="text" placeholder="Enter UserName" className={style.inputBox}></input>
            <input type="password" placeholder="Enter Password" className={style.inputBox}></input>
            <button className={style.submitButton} onClikc={()=>submit()}>LogIn</button>
        </form>
        <p style={{textAlign:"center",margin:"5px"}}>OR</p>
        </div>
    )
}

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
                <div className={`${style2.col_flex}`} style={{backgroundColor:"black",borderRadius:"10px",alignItems:"center",width:"100%",padding:"10px"}}>
                    <Image src="/LoginIMG.png" alt="RandomImage" width={120} height={120}/>
                    <SignupOption/>
                    <LoginOptions/>
                </div>
        </div>
    )
}