import {Atma,Zain} from "next/font/google"
import style from "../styles/homepage.module.css"

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
    return(
        <div className={`${style.row_flex} ${style.mblayout} ${zain.className}`}>
            <div className={`${style.title} ${atma.className}`}>JanAwaaz</div>
            <Logo/>
            <div className={style.row_flex}>
                <button className={style.options}>Contact</button>
                <button className={style.options}>Help</button>
                <button className={style.options}>Login</button>
            </div>
        </div>
    )
}

function FootSection(){
    return(
        <footer className={`${style.footer} ${zain.className}`} style={{alignItems:"center",justifyContent:"center"}}>
            <div className={style.row_flex} style={{gap:"20px"}}>
                <div className={style.row_flex} style={{gap:"5px",marginRight:"auto"}}>
                    <div className={atma.className} style={{fontSize:"18px"}}>JanAwaaz</div>
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
