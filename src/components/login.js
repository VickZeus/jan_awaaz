"use client"
import style from "@/styles/loginpage.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons"
import { faGoogle, faGithub,faFacebook } from "@fortawesome/free-brands-svg-icons";
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { useRouter } from "next/navigation"
import style2 from "../styles/homepage.module.css"


function LogoImage(){
    return(
        <Image src="/Logo.png" width={150} height={150} alt="logo"></Image>
    )
}

function Logo(){
  return(
    <>
      <div className={style2.logo}>
        <div className={style2.box}></div>
        <div className={style2.box}></div>
        <div className={style2.box}></div>

        <div className={style2.box}></div>
        <div className={style2.box}></div>
        <div className={style2.box}></div>

        <div className={style2.box}></div>
        <div className={style2.box}></div>
        <div className={style2.box}></div>
      </div>
    </>
  )
}

function LogoTitle() {
  const text = "JanAwaaz";
  return (
    <div className={style2.logoTitle}>
      {text.split("").map((char,index)=>(
        <span key={index} className={style2.letter}>{char}</span>
      ))}
      <Logo/>
    </div>
  );
}


function SignInForm(){
    const [message,setMessage]=useState("");
    const [formData,setformData]=useState({email:"",password:""});
    const router=useRouter()

    async function handleSubmit(e){
        e.preventDefault()
        if(!formData.email || !formData.password){
            setMessage("All fields are required");return;
        }
        try{
            const res=await fetch("/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            })
            if(!res.ok){
                const data=await res.json();
                setMessage(data.error || "Sign-in Failed")
                return;
            }
            router.push("/")
        }
        catch(error){
            setMessage("Something Went Wrong")
        }  
    }

    async function handleChange(e){
        setformData({...formData,[e.target.name]:e.target.value})
        setMessage("");
    }

    return(
        <form className={`${style.colFlex}`} style={{gap:"10px"}} onSubmit={handleSubmit}>
            <h1>Sign In</h1>
            <div className={style.rowFlex}>
                <FontAwesomeIcon icon={faEnvelope} style={{color:"white",fontSize:"18px"}}/>
                <input onChange={handleChange} type="email" placeholder="Enter registered email" name="email"></input>
            </div>

            <div className={style.rowFlex} style={{color:"white",fontSize:"18px"}}>
                <FontAwesomeIcon icon={faLock} />
                <input onChange={handleChange} type="password" placeholder="Enter password" name="password"></input>
            </div>
            <p>{message}</p>
            <button className="buttonBW" type="submit">Submit</button>
        </form>
    )
}


function OAuthSection(){
    return(
        <>
            <div className="divider"><span>OR</span></div>

            <div className={`${style.rowFlex}`}>
                <button className="buttonBW">
                      <FontAwesomeIcon icon={faGoogle} size="lg" />
                </button>

                <button className="buttonBW">
                        <FontAwesomeIcon icon={faGithub} size="lg" />
                </button>

                <button className="buttonBW">
                        <FontAwesomeIcon icon={faFacebook} size="lg" />
                </button>
            </div>
        </>
    )
}

function ForgotPassword(){
    return(
        <div className={`${style.rowFlex}`}>
            <a style={{color:"blue",fontSize:"14px"}} href="#">Forgot password?</a>
        </div>
    )
}

function SignUp(){
    return(
        <div className={`${style.rowFlex}`}>
            <span style={{color:"white",fontSize:"12px"}}>Don&apos;t have an account?</span>
            <Link href="/signup" style={{color:"blue",fontSize:"12px"}}>Sign Up</Link>
        </div>
    )
}

export default function Form(){
    return(
        <div className={style.form}>
            <LogoTitle/>
            <LogoImage/>
            <SignInForm/>
            <ForgotPassword/>
            <OAuthSection/>
            <SignUp/>
        </div>
    )
}