import style from "../styles/homepage.module.css"
import {Atma,Zain} from "next/font/google"

const atma=Atma({subsets:["latin"],weight:["400","700"]})
const zain=Zain({subsets:["latin"],weight:["400","700"]})
export default function HomePage(){
    return(
        <div className={`${style.row_flex} ${style.layout} ${zain.className}`}>
            <div className={`${style.title} ${atma.className}`}>JanAwaaz</div>
            <div className={style.row_flex}>
                <button className={style.options}>Contact</button>
                <button className={style.options}>Help</button>
                <button className={style.options}>Login</button>
            </div>
        </div>
    )
}