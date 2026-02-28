
import {LogoTitle} from "@/app/page"
import Image from "next/image"
import SignInForm from "@/components/sign_up"
import style from "@/styles/loginpage.module.css"


function LogoImage(){
    return(
        <Image src="/Logo.png" width={150} height={150} alt="logo"></Image>
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