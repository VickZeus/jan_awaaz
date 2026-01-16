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
import {useState} from "react";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import Link from "next/link"
import {supabase} from '../api/login/supabaseClient';


function LoginOptions(){
    return(
        <div className={`${style2.col_flex}`} style={{gap:"10px"}}>
            <button onClick={()=>signIn("google")} className={style.option}><FontAwesomeIcon icon={faGoogle}/>LogIn Using Google</button>
            <button onClick={()=>signIn("github")} className={style.option}><FontAwesomeIcon icon={faGithub}/>LogIn Using Github</button>
            <button onClick={()=>signIn("facebook")} className={style.option}><FontAwesomeIcon icon={faFacebook}/>LogIn Using Facebook</button>
        </div>
    )
}

function JoinIcon({Icon,JSX}){
    return(
        <div className={style2.row_flex} style={{justifyContent:"center",alignItems:"center",gap:"10px"}}>
            {Icon}
            {JSX}
        </div>
    )
}

function SignupOption(){
    const [userName,setUserName]=useState("");
    const [password,setPassword]=useState("");

    const onsubmitHandler=async(event)=>{
        event.preventDefault();
    }

    return(
        <div className={style2.col_flex} style={{color:"white",textAlign:"center"}}>
        <div style={{fontSize:"24px"}}>Sign In</div>
        <form onSubmit={onsubmitHandler} className={style2.col_flex} >
            <JoinIcon Icon={<FaUser size={20}/>} JSX={<input type="text" placeholder="Enter UserName" className={style.inputBox} onChange={(e)=>setUserName(e.target.value)}></input>}/>
            <JoinIcon Icon={<FaLock size={20}/>} JSX={<input type="password" placeholder="Enter Password" className={style.inputBox} onChange={(e)=>setPassword(e.target.value)}></input>}/>
            <button type="submit" className={style.submitButton}>LogIn</button>
        </form>
        </div>
    )
}

function CreateAccount(){
    const [username,setUserName]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");  
    const [loading, setLoading] = useState(false);
    const [alertMessage,setAlert]=useState("");
    const router=useRouter();

    const alerter=(error)=>{
        if(error.message==="duplicate key value violates unique constraint \"userinfo_email_key\""){
            setAlert("*Email Already Registered")
        }
        else if(error.message==="duplicate key value violates unique constraint \"userinfo_pkey\""){
            setAlert("*Username already registered")
        }
        else{
            setAlert("*Try Again")
        } 
    }

    const accountCreateHandler=async (event)=>{
        event.preventDefault();

        setLoading(true);
        const {data,error}=await supabase.auth.signUp({email,password,options:{data:{username:username||"Null"}}})
        if(error){
            setLoading(false);
            console.log(error.message);
            alerter(error);
            return;
        }
        else{
            const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({email,password,});
            if(error){
                console.log(error.message);
                alerter(error);
                return;
            }
            setLoading(false);
            setUserName("");
            setEmail("");
            setPassword("");
            router.replace("/HomePage");
        }
    }

    return(
        <div style={{color:"white",textAlign:"center"}}>
            <p style={{fontSize:"24px"}}>Create Account</p>
            <form onSubmit={accountCreateHandler} className={style2.col_flex}>
                <JoinIcon Icon={<FaUser size={20}/>} JSX={<input placeholder="Enter Username" className={style.inputBox} value={username} onChange={(e)=>setUserName(e.target.value)}></input>}/>
                <JoinIcon Icon={<FaEnvelope size={20}/>} JSX={<input placeholder="Enter Email Id" className={style.inputBox} value={email} onChange={(e)=>setEmail(e.target.value)}></input>}/>
                <JoinIcon Icon={<FaLock size={20}/>} JSX={<input placeholder="Enter Password" className={style.inputBox} value={password} type="Password" onChange={(e)=>setPassword(e.target.value)}></input>}/>
                <div style={{color:"white",fontSize:"14px"}}>{alertMessage}</div>
                <button type="submit" className={style.submitButton}>Sign-Up</button>
            </form>
        </div>
    )
}

export default function LoginPage(){
    const {data:session,status}=useSession();
    const router=useRouter();
    const [userStatus,setStatus]=useState("old");

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
                    {userStatus=="old"?<SignupOption/>:<CreateAccount/>}

                    <div className={style2.row_flex} style={{marginBlock:"10px",gap:"30px"}}>
                        <Link href="/forgotPassword" style={{color:"blue"}}>Forgot Password ?</Link>
                        <button onClick={()=>{
                            userStatus=="new"?setStatus("old"):setStatus("new")
                        }} style={{backgroundColor:"transparent",color:"white"}}>
                            {userStatus=="old"?"Create Account?":"Sign In"}
                        </button>
                    </div>
                    <p style={{textAlign:"center",margin:"10px",color:"white"}}>OR</p>
                    <LoginOptions/>
                </div>
        </div>
    )
}