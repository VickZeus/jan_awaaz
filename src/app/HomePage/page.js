"use client"
import style from "@/styles/homepage.module.css"
import {useRouter} from "next/navigation"
import {signOut,useSession} from "next-auth/react"
import {useEffect} from "react"

function Logo(){
    return(
        <div className={style.logo}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    );
}

function HeadSection(){
    const router=useRouter();
    const {date:session,status}=useSession();

    useEffect(()=>{if(status==="unauthenticated"){
        router.replace("/")
    }},[status,router])





    return(
        <div className={`${style.row_flex} ${style.mblayout} heading`}>
            <div className={`${style.title}`}>JanAwaaz</div>
            <Logo/>
            <div className={style.row_flex}>
                <button className={style.options} onClick={()=>router.push("/Contact")}>Contact</button>
                <button className={style.options} onClick={()=>router.push("/Help")}>Help</button>
                <button id="loginButton" className={style.options} onClick={()=>signOut()}>SignOut</button>
            </div>
        </div>
    )
}

function LogoAndTitle({styleExtra}){
    return(
        <div style={styleExtra}>
            <div className={style.row_flex} style={{gap:"10px",marginRight:"auto",marginBlock:"auto",fontSize:"24px"}}>
            <div className="heading">JanAwaaz</div>
            <Logo/>
            </div>
        </div>

    )
}

function FootSection(){
    return(
        <footer className={`${style.footer} heading`} style={{alignItems:"center",justifyContent:"center"}}>
            <div className={style.row_flex} style={{gap:"20px"}}>
                <LogoAndTitle/>

                <div className={style.col_flex} >
                    <p>Help</p>
                    <p>-</p>
                    <p>-</p>
                    <p>-</p>
                </div>
                <div className={style.col_flex}>
                    <p>Contact Us</p>
                    <p>-</p>
                    <p>-</p>
                    <p>-</p>
                </div>
            </div>
            <div>© 2025 JanAwaaz. All rights reserved.</div>
        </footer>
    )
}


export default function HomePage(){
    return(
        <div>
            <HeadSection/>
            <FootSection/>
        </div>
    )
}

export {HeadSection,FootSection,Logo,LogoAndTitle}
