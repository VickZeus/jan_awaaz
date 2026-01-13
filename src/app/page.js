"use client"

import {Atma,Zain} from "next/font/google"
import style from "../styles/homepage.module.css"
import {useRouter} from "next/navigation"

const atma=Atma({subsets:["latin"],weight:["400","700"]})
const zain=Zain({subsets:["latin"],weight:["400","700"]})

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
    return(
        <div className={`${style.row_flex} ${style.mblayout} ${zain.className}`}>
            <div className={`${style.title} ${atma.className}`}>JanAwaaz</div>
            <Logo/>
            <div className={style.row_flex}>
                <button className={style.options} onClick={()=>router.push("/Contact")}>Contact</button>
                <button className={style.options} onClick={()=>router.push("/Help")}>Help</button>
                <button className={style.options} onClick={()=>router.push("/")}>Login</button>
            </div>
        </div>
    )
}

function FootSection(){
    return(
        <footer className={`${style.footer} ${zain.className}`} style={{alignItems:"center",justifyContent:"center"}}>
            <div className={style.row_flex} style={{gap:"20px"}}>
                <div className={style.row_flex} style={{gap:"10px",marginRight:"auto",marginBlock:"auto",fontSize:"24px"}}>
                    <div className={atma.className} style={{}}>JanAwaaz</div>
                    <Logo/>
                </div>

                <div className={style.col_flex} >
                    <p className={atma.className}>Help</p>
                    <p>-</p>
                    <p>-</p>
                    <p>-</p>
                </div>
                <div className={style.col_flex}>
                    <p className={atma.className}>Contact Us</p>
                    <p>-</p>
                    <p>-</p>
                    <p>-</p>
                </div>
            </div>
            <div>© 2024 JanAwaaz. All rights reserved.</div>
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

export {HeadSection,FootSection,Logo}
