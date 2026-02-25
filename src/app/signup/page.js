"use client"

import {useState} from "react"
import {useRouter} from "next/navigation"
import style from "@/styles/loginpage.module.css"
import {LogoTitle} from "@/app/page"
import Image from "next/image"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEnvelope, faLock,faUser,faKey} from "@fortawesome/free-solid-svg-icons"

function LogoImage(){
    return(
        <Image src="/Logo.png" width={150} height={150} alt="logo"></Image>
    )
}

function SignInForm(){
    const [message,setMessage]= useState("")
    const [formData,setformData]=useState({
        username:"",password:"",email:"",password2:""
    }) 
    const router=useRouter();
    
    function handleChange(e){
        setformData({...formData,[e.target.name]:e.target.value})
        setMessage("");
    }

    async function handleSubmit(e){
        e.preventDefault()
        if(!formData.username || !formData.password ||!formData.email || !formData.password2){
            setMessage("All fields are required");
            return ;
        }

        if(!(formData.password===formData.password2)){
            setMessage("Passwords do not match");return;
        }
        
        try{
            const res=await fetch("/api/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            })
            if(!res.ok){
                return;
            }
            router.replace("/homepage")
        }
        catch(error){
            setMessage("Something Went Wrong")
        }   
    }
    
    return(
        <form className={`${style.colFlex}`} style={{gap:"10px"}} onSubmit={handleSubmit}>
            <h1>Sign Up</h1>

            <div className={style.rowFlex} style={{color:"white",fontSize:"18px"}}>
                <FontAwesomeIcon icon={faUser} />
                <input 
                type="text" 
                placeholder="Enter Username"
                name="username"
                onChange={handleChange}
                >   
                </input>
            </div>

            <div className={style.rowFlex}>
                <FontAwesomeIcon icon={faEnvelope} style={{color:"white",fontSize:"18px"}}/>
                <input 
                type="email" 
                placeholder="Enter registered email"
                name="email"
                onChange={handleChange}
                ></input>
            </div>

            <div className={style.rowFlex} style={{color:"white",fontSize:"18px"}}>
                <FontAwesomeIcon icon={faLock} />
                <input 
                type="password" 
                placeholder="Enter password"
                name="password"
                onChange={handleChange}
                ></input>
            </div>

            <div className={style.rowFlex} style={{color:"white",fontSize:"18px"}}>
                <FontAwesomeIcon icon={faKey} />
                <input 
                type="password" 
                placeholder="Confirm password"
                name="password2"
                onChange={handleChange}></input>
                
            </div>

            <p id="message">{message}</p>
            <button className="buttonBW" type="submit">Submit</button>
        </form>
    )
}


function Form(){
    return(
        <div className={style.form}>
            <LogoTitle/>
            <LogoImage/>
            <SignInForm/>
        </div>
    )
}

export default function LoginPage(){
    return(
        <div className={style.container}>
                <Form/>
        </div>
    )
}