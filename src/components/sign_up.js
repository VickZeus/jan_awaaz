"use client"
import {useState} from "react"
import {useRouter} from "next/navigation"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEnvelope, faLock,faUser,faKey,faShield} from "@fortawesome/free-solid-svg-icons"
import style from "@/styles/loginpage.module.css"



export default function SignInForm(){
    const [message,setMessage]= useState("")
    const [email,setEmail]=useState("")
    const [otp,setOtp]=useState("")
    const [formData,setformData]=useState({
        username:"",password:"",email:"",password2:""
    }) 
    const router=useRouter();
    
    function handleChange(e){
        setformData({...formData,[e.target.name]:e.target.value})
        setMessage("");
    }

    async function handleSubmit(e){
        e.preventDefault()
        if(!formData.username || !formData.password ||!formData.email || !formData.password2){
            setMessage("All fields are required");
            return ;
        }

        if(!(formData.password===formData.password2)){
            setMessage("Passwords do not match");return;
        }
        
        try{
            const res=await fetch("/api/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            })
            const data=await res.json();
            
            if(!res.ok){
               setMessage(data.error || "Signup failed"); return;
            }
            setEmail(data.message);
        }
        catch(error){
            setMessage("Something Went Wrong")
        }   
    }


    async function handleSubmit2(e){
        e.preventDefault()
        try{
            const res=await fetch("/api/verify_otp",{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({email,otp})
            })

            const data=await res.json();
            if(!res.ok){
                setMessage(data.error || "OTP verification failed");return;
            }
            router.push("/login");
        }
        catch(error){
            setMessage("Something Went Wrong")
        }
    }
    
    return(
        (email==="")?(
        <form className={`${style.colFlex}`} style={{gap:"10px"}} onSubmit={handleSubmit}>
            <h1>Sign Up</h1>

            <div className={style.rowFlex} style={{color:"white",fontSize:"18px"}}>
                <FontAwesomeIcon icon={faUser} />
                <input 
                type="text" 
                placeholder="Enter Username"
                name="username"
                onChange={handleChange}
                >   
                </input>
            </div>

            <div className={style.rowFlex}>
                <FontAwesomeIcon icon={faEnvelope} style={{color:"white",fontSize:"18px"}}/>
                <input 
                type="email" 
                placeholder="Enter registered email"
                name="email"
                onChange={handleChange}
                ></input>
            </div>

            <div className={style.rowFlex} style={{color:"white",fontSize:"18px"}}>
                <FontAwesomeIcon icon={faLock} />
                <input 
                type="password" 
                placeholder="Enter password"
                name="password"
                onChange={handleChange}
                ></input>
            </div>

            <div className={style.rowFlex} style={{color:"white",fontSize:"18px"}}>
                <FontAwesomeIcon icon={faKey} />
                <input 
                type="password" 
                placeholder="Confirm password"
                name="password2"
                onChange={handleChange}></input>
                
            </div>

            <p id="message">{message}</p>
            <button className="buttonBW" type="submit">Submit</button>
        </form>
        )
        :
        (
        <form className={`${style.colFlex}`} style={{gap:"10px"}} onSubmit={handleSubmit2}>
            <h1 style={{color:"white",fontSize:"20px"}}>Verify OTP</h1>
            <p style={{color:"white",fontSize:"13px",textAlign:"center",margin:"5px"}}>
                An OTP has been sent to your email: {email}<br/>
                Please enter the OTP to continue.<br/>OTP is valid for 5 minutes.</p>

            <div className={style.rowFlex} style={{color:"white",fontSize:"24px",padding:"5px"}}>
                <FontAwesomeIcon icon={faShield} />
                <input 
                style={{color:"white",fontSize:"16px",padding:"2px",textAlign:"center",border:"1px solid white"}}
                type="password" 
                placeholder="Enter OTP"
                name="otp"
                onChange={(e)=>setOtp(e.target.value)}></input>
            </div>

            <p id="message">{message}</p>
            <button className="buttonBW" type="submit">Submit</button>
        </form>            
        )
    )
}

