"use client"
import {Zain} from "next/font/google"
import style from "../styles/homepage.module.css"
import {useRouter} from "next/navigation"

const zain=Zain({subsets:["latin"],weight:["400","700"]})

function PageUnderDev({Name}) {
    const router=useRouter();
    return(
        <div className={`${zain.className} ${style.col_flex}`} style={{backgroundColor:"000000",color:"white",height:"80vh",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"12px",textAlign:"center",padding:"10px",gap:"20px"}}>
            The {Name} page is under development. We recommend checking back later.
            Really sorry for the inconvenience so caused.
            <button onClick={()=>router.push("/")}>Go Back</button>
        </div>
    )
}

export default PageUnderDev;