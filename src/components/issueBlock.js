"use client"
import {useRouter} from "next/navigation"
import {useState} from "react"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faArrowUp,faFire,faArrowDown,faShare,faMessage} from "@fortawesome/free-solid-svg-icons"
import style from "@/styles/issueStyle.module.css"

export default function Issue_Block(props){
    return(
        <div className={style.block}>
            <p style={{fontSize:"14px",fontWeight:"600"}}>{props.title || "Issue Title"}</p>
            <p className={style.descArea}>{props.description||"Issue Description"}</p>

            <div className={style.rowFlex} style={{fontSize:"16px",fontWeight:"600"}}>
                <button onClick={()=>upvoteModify()} className={`${style.upvoteStyle} ${style.rowF}`}>
                    <FontAwesomeIcon icon={faArrowUp}/>
                    <p>32.2k</p>
                </button>

                <button onClick={()=>downvoteModify()} className={`${style.downvoteStyle} ${style.rowF}`}>
                    <FontAwesomeIcon icon={faArrowDown}/>
                    <p>32.2k</p>
                </button>

                <button onClick={()=>OpenComments()}><FontAwesomeIcon icon={faMessage}/></button>
                <button onClick={()=>Share()}><FontAwesomeIcon icon={faShare}/></button>
            </div>

        </div>
    )
}