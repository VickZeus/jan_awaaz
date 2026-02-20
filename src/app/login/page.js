"use client"

import style from "@/styles/loginpage.module.css"
import {LogoTitle} from "@/app/page"
import Image from "next/image"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons"
import { faGoogle, faGithub,faFacebook } from "@fortawesome/free-brands-svg-icons";

import Link from "next/link"

function LogoImage(){
    return(
        <Image src="/Logo.png" width={150} height={150} alt="logo"></Image>
    )
}

function SignInForm(){
    return(
        <form className={`${style.colFlex}`} style={{gap:"10px"}}>
            <h1>Sign In</h1>
            <div className={style.rowFlex}>
                <FontAwesomeIcon icon={faEnvelope} style={{color:"white",fontSize:"18px"}}/>
                <input type="email" placeholder="Enter registered email"></input>
            </div>

            <div className={style.rowFlex} style={{color:"white",fontSize:"18px"}}>
                <FontAwesomeIcon icon={faLock} />
                <input type="password" placeholder="Enter password"></input>
            </div>
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

function Form(){
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

export default function LoginPage(){
    return(
        <div className={style.container}>
                <Form/>
        </div>
    )
}