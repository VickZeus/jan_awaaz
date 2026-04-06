"use client"
import {useRouter} from "next/navigation"
import {useState} from "react"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faArrowUp,faFire,faArrowDown,faShare,faMessage} from "@fortawesome/free-solid-svg-icons"
import style from "@/styles/issueStyle.module.css"
import Image from "next/image"



function ExpandedView({setVal,boolval,...props}){
    return(
        <div className={style.expandedView}>
            <div onClick={()=>setVal(!boolval)}>
                    <p className={style.titleRow} >{props.title || "Issue Title"}</p>
                    <div className={style.expBlock} style={{fontSize:"11px"}}>
                    <p><b>Location: </b>{`[${Number(props.latitude).toFixed(2) || "-"} , ${Number(props.longtitude).toFixed(2) || "-"}]`}</p>
                    <p><b>Tags: </b>{props.tags||"None"}</p>
                    <div>{props.description || "Sample_Issue_Description"}</div>         
                    </div>
            </div>
            <Image style={{borderRadius:"4px",marginBlock:"5px",marginInline:"auto"}}src={props.image_url ||"/default-image.jpg"} alt="Issue Image" width={150} height={150}/>
            <Options {...props}/>
        </div>
    )
}

function Options(props){
    const [upvote,setUpvote]=useState(props.upvotes??0);
    const [downvote,setDownvote]=useState(props.downvotes??0);
    const [enableU,setEnableU]=useState(true);//true if user can upvote
    const [enableD,setEnableD]=useState(true);// true if user can downvote

    function updateResults(upvote,downvote,message){
        fetch("/api/records",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id:props.issue_id,
                    upvote,
                    downvote,
                    message
                })
            })
            .then(res=>res.json())
            .then(data=>{
                if(data?.data?.length>0){
                const updated = data.data[0];
                setUpvote(updated.upvotes);
                setDownvote(updated.downvotes);
                console.log(updated.upvotes,updated.downvotes);
             }})
            .catch(error=>{console.log(error);})
    }

    function NumberUpdate(val){
        if(val>500)return (val/1000).toFixed(1)+'k';
        return val;
    }

    function handleUpdateU(){
        // if downvote is false and user clicks on upvote
        // then we need to remove the downvote
        let newDownvote=(enableD)?downvote:downvote-1;
        setDownvote(newDownvote);setEnableD(true);
        let newUpvote=(enableU)?upvote+1:upvote-1;
        
        setUpvote(newUpvote);
        setEnableU(prev=>!prev);
        updateResults(newUpvote,newDownvote,"");
    }

    function handleUpdateD(){
        let newUpvote=(enableU)?upvote:upvote-1;
        setUpvote(newUpvote);setEnableU(true);
        let newDownvote=(enableD)?downvote+1:downvote-1;
        setDownvote(newDownvote);
        setEnableD(prev=>!prev);
        updateResults(newUpvote,newDownvote,"");
    }

    return(
            <div className={style.rowFlex} style={{fontSize:"16px",fontWeight:"600",backgroundColor:"white",color:"black",borderRadius:"10px"}}>
                <button onClick={handleUpdateU} className={`${style.upvoteStyle} ${style.rowF}`}
                style={{color:enableU?"black":"green"}}>
                    <FontAwesomeIcon icon={faArrowUp}/>
                    {NumberUpdate(upvote)}
                </button>

                <button onClick={handleUpdateD} className={`${style.downvoteStyle} ${style.rowF}`}
                    style={{
                        color:enableD?"black":"red"
                    }}
                >
                    <FontAwesomeIcon icon={faArrowDown}/>
                    {NumberUpdate(downvote)}
                </button>

                <button onClick={()=>OpenComments()}><FontAwesomeIcon icon={faMessage}/></button>
                <button onClick={()=>Share()}><FontAwesomeIcon icon={faShare}/></button>
            </div>
    )
}

function MinimisedView({setVal,boolval,...props}){
    return(
        <div className={style.block}>
            <div onClick={()=>setVal(!boolval)}>
            <p style={{fontSize:"14px",fontWeight:"600"}}>{props.title || "Issue Title"}</p>
            <p className={style.descArea}>{props.description||"Issue Description"}</p>
            {/* <Options {...props}/> */}
            </div>

        </div>
    )
}

export default function Issue_Block(props){
    const [boolval,setVal]=useState(true);
    return boolval 
    ? <MinimisedView {...props} setVal={setVal} boolval={boolval} />
    : <ExpandedView {...props} setVal={setVal} boolval={boolval} />;
}