"use client"
import {useRouter} from "next/navigation"
import {useState} from "react"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faHeart,faThumbsDown,faShare,faMessage} from "@fortawesome/free-solid-svg-icons"
import style from "@/styles/issueStyle.module.css"
import Image from "next/image"



function ExpandedView({...props}){
const DEFAULT_IMAGE = "https://nnbwatxqncfcddhtkrpw.supabase.co/storage/v1/object/public/report_images/no_image_found.png";

    function getValidImage(url) {
    if (!url||typeof url!=="string") return DEFAULT_IMAGE;
    try {
        new URL(url);return url;
    }catch{return DEFAULT_IMAGE;}
    }
    return(
        <div className={style.expandedView}>
            <div onClick={()=>props.setVal(!props.boolval)}>
                    <p className={style.titleRow} >{props.title || "Issue Title"}</p>
                    <div className={style.expBlock} style={{fontSize:"11px"}}>
                    <p><b>Location: </b>{`[${Number(props.latitude).toFixed(2) || "-"} , ${Number(props.longtitude).toFixed(2) || "-"}]`}</p>
                    <p><b>Tags: </b>{props.tags||"None"}</p>
                    <div>{props.description || "Sample_Issue_Description"}</div>         
                    </div>
            </div>
            <Image style={{borderRadius:"4px",marginBlock:"5px",marginInline:"auto"}}src={getValidImage(props.image_url)} alt="Issue Image" width={150} height={150}/>
            <Options     
            issue_id={props.issue_id}
            upvote={props.upvote}
            downvote={props.downvote}
            enableU={props.enableU}
            enableD={props.enableD}
            setEnableU={props.setEnableU}
            setEnableD={props.setEnableD}
            setUpvote={props.setUpvote}
            setDownvote={props.setDownvote}
            />
        </div>
    )
}

function Options(props){
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
                props.setUpvote(updated.upvotes);
                props.setDownvote(updated.downvotes);
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
        let newDownvote=(props.enableD)?props.downvote:props.downvote-1;
        props.setDownvote(newDownvote);props.setEnableD(true);
        let newUpvote=(props.enableU)?props.upvote+1:props.upvote-1;
        
        props.setUpvote(newUpvote);
        props.setEnableU(prev=>!prev);
        updateResults(newUpvote,newDownvote,"");
    }

    function handleUpdateD(){
        let newUpvote=(props.enableU)?props.upvote:props.upvote-1;
        props.setUpvote(newUpvote);props.setEnableU(true);
        let newDownvote=(props.enableD)?props.downvote+1:props.downvote-1;
        props.setDownvote(newDownvote);
        props.setEnableD(prev=>!prev);
        updateResults(newUpvote,newDownvote,"");
    }

    return(
            <div className={style.rowFlex} style={{fontSize:"16px",fontWeight:"600",backgroundColor:"white",color:"black",borderRadius:"10px"}}>
                <button onClick={handleUpdateU} className={`${style.upvoteStyle} ${style.rowF}`}
                style={{color:props.enableU?"black":"red"}}>
                    <FontAwesomeIcon icon={faHeart}/>
                    {NumberUpdate(props.upvote)}
                </button>

                <button onClick={handleUpdateD} className={`${style.downvoteStyle} ${style.rowF}`}
                    style={{
                        color:props.enableD?"black":"red"
                    }}
                >
                    <FontAwesomeIcon icon={faThumbsDown}/>
                    {NumberUpdate(props.downvote)}
                </button>

                <button onClick={()=>OpenComments()}><FontAwesomeIcon icon={faMessage}/></button>
                <button onClick={()=>Share()}><FontAwesomeIcon icon={faShare}/></button>
            </div>
    )
}

function MinimisedView({...props}){
    return(
        <div className={style.block}>
            <div onClick={()=>props.setVal(!props.boolval)}>
            <p style={{fontSize:"14px",fontWeight:"600"}}>{props.title || "Issue Title"}</p>
            <p className={style.descArea}>{props.description||"Issue Description"}</p>
            {/* <Options {...props}/> */}
            </div>

        </div>
    )
}

export default function Issue_Block(props){

    const [upvote,setUpvote]=useState(props.upvotes??0);
    const [downvote,setDownvote]=useState(props.downvotes??0);
    const [enableU,setEnableU]=useState(true);
    const [enableD,setEnableD]=useState(true);

    const [boolval,setVal]=useState(true);
    return boolval 
    ? <MinimisedView {...props} 
        setVal={setVal} 
        boolval={boolval} 
        upvote={upvote} 
        downvote={downvote} 
        enableU={enableU}
        enableD={enableD}
        setEnableD={setEnableD}
        setEnableU={setEnableU}
        setUpvote={setUpvote}
        setDownvote={setDownvote}
    />
    : <ExpandedView {...props} 
        setVal={setVal} 
        boolval={boolval} 
        upvote={upvote} 
        downvote={downvote} 
        enableU={enableU}
        enableD={enableD}
        setEnableD={setEnableD}
        setEnableU={setEnableU}
        setUpvote={setUpvote}
        setDownvote={setDownvote}
    />;
}