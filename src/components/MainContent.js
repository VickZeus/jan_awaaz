"use client"
import {useState} from "react"
import {useRouter} from "next/navigation"
import style from "../styles/homepage.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {faArrowTrendUp,faFire,faLocationDot,faAlarmClock} from "@fortawesome/free-solid-svg-icons"
import Issue_Block from "@/components/issueBlock"

function JoinICON({icon,title,clickFunc,selected}){
    const isActive=title===selected;
    return(
        <button id={title} className={style.join_icon} style={{backgroundColor:isActive?"white":"transparent",color:isActive?"black":"white"}} onClick={()=>clickFunc(title)}>
            <FontAwesomeIcon icon={icon} style={{fontSize:"16px"}}/>
            <span>{title}</span>
        </button>
    )
}

function Options({setIssues,setLoading}){
    const[selected,setSelected]=useState("");
    const router=useRouter();
    
    function getResults(k){
        setSelected(k);
        setLoading(true);

        const latitude=sessionStorage.getItem("latitude");
        const longtitude=sessionStorage.getItem("longitude");

        fetch(`/api/records?type=${k}&lat=${latitude}&lon=${longtitude}&radius=5000`)
            .then(res=>{
                if(res.status===401){
                    router.push("/login");
                    return;
                }
                return res.json()
            }) 
            .then(data=>setIssues(data.data))
            .catch(error=>console.log(error))
            .finally(()=>setLoading(false))
    }
    return(
        <div className={style.rowFlex}>
            <JoinICON icon={faArrowTrendUp} selected={selected} title={"Trending"} clickFunc={()=>getResults("Trending")}/>
            <JoinICON icon={faAlarmClock} selected={selected} title={"Recent"} clickFunc={()=>getResults("Recent")}/>
            <JoinICON icon={faLocationDot} selected={selected} title={"Near Me"} clickFunc={()=>getResults("Near Me")}/>
            <JoinICON icon={faFire} selected={selected} title={"Popular"} clickFunc={()=>getResults("Popular")}/>
        </div>
    )
}

function ContentBlock({issues}){
    return(
        <div className={style.contentBlock}>
            {issues.map(issue=>(
                <Issue_Block key={issue.issue_id} {...issue}/>
            ))}
        </div>
    )
}

function Loading(){
    return(
        <div className={style.loading}>
            <p className={style.buffer}></p>
        </div>
    )
}


export default function MainPage(){
    const [issues, setIssues] = useState([])
    const[isLoading,setLoading]=useState(false);
    return(
        <div className={style.mainContent}>
            <div className={style.containerMP}>
                <Options setIssues={setIssues} setLoading={setLoading}/>
                {isLoading?<Loading/>:<p></p>}
                <ContentBlock issues={issues}/>
            </div>
        </div>
    )
}