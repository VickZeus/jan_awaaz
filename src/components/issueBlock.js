"use client"
import {useRouter} from "next/navigation"
import {useState} from "react"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faArrowUp,faFire,faArrowDown,faShare,faMessage} from "@fortawesome/free-solid-svg-icons"
import style from "@/styles/issueStyle.module.css"
import Image from "next/image"



function ExpandedView(props,setVal,boolval){
    return(
        <div className={style.expandedView}>
            <p style={{fontSize:"18px",fontWeight:"600"}}>{props.title || "Issue Title"}</p>
            <div className={style.expBlock} style={{fontSize:"11px"}}>
            <p><b>Location: </b>{`[${Number(props.latitude).toFixed(2) || "-"} , ${Number(props.longtitude).toFixed(2) || "-"}]`}</p>
            <p><b>Tags: </b>{props.tags||"None"}</p>
            <div>{props.description || "Sample_Issue_Description"}</div>         
            <Image style={{borderRadius:"4px",marginBlock:"5px",marginInline:"auto"}}src={props.image_url ||"/default-image.jpg"} alt="Issue Image" width={150} height={150}/>
            <Options props={props}/>
            </div>

        </div>
    )
}

function Options(props){
    return(
            <div className={style.rowFlex} style={{fontSize:"16px",fontWeight:"600"}}>
                <button onClick={()=>upvoteModify()} className={`${style.upvoteStyle} ${style.rowF}`}>
                    <FontAwesomeIcon icon={faArrowUp}/>
                    <p>{props.upvotes??"0"}</p>
                </button>

                <button onClick={()=>downvoteModify()} className={`${style.downvoteStyle} ${style.rowF}`}>
                    <FontAwesomeIcon icon={faArrowDown}/>
                    <p>{props.downvotes??"0"}</p>
                </button>

                <button onClick={()=>OpenComments()}><FontAwesomeIcon icon={faMessage}/></button>
                <button onClick={()=>Share()}><FontAwesomeIcon icon={faShare}/></button>
            </div>
    )
}

function MinimisedView(props,setVal,boolval){
    return(
        <div className={style.block}>
            <div onClick={()=>setVal(!boolval)}>
            <p style={{fontSize:"14px",fontWeight:"600"}}>{props.title || "Issue Title"}</p>
            <p className={style.descArea}>{props.description||"Issue Description"}</p>
            <Options props={props}/>
            </div>

        </div>
    )
}

export default function Issue_Block(props){
    const [boolval,setVal]=useState(true);
    return(boolval?MinimisedView(props,setVal,boolval):ExpandedView(props,setVal,boolval))
}