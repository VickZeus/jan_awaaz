"use client"

import {useState} from "react"
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
    const [message,setMessage]=new useState("")
    const [formData,setformData]=new useState({
        username:"",password:"",email:"",password2:""
    }) 

    function handleChange(e){
        setformData({...formData,[e.target.name]:e.target.value})
        setMessage("");
    }

    function handleSubmit(e){
        console.log(formData)
        e.preventDefault()
        if(!formData.username || !formData.password ||!formData.email || !formData.password2){
            setMessage("All fields are required");
            return ;
        }

        if(!(formData.password===formData.password2)){
            setMessage("Passwords do not match");return;
        }
        return;
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