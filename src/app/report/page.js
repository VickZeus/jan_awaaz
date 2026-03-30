"use client"
import style from "@/styles/reportpage.module.css"
import Image from "next/image"
import GetCoordinates from "@/components/getCoordinates"
import GetBack from "@/components/getHome"


import {useState} from "react"
import {useRouter} from "next/navigation"


export default function ReportMP(){
    const router=useRouter()
    const [Message,setMessage]=useState("")
    const [formData,setformData]=useState({title:"",description:"",gps_cord:"",issue_image:""})
    const [preview, setPreview] =useState(null);

    function handleLocationSelect(latlng) {
        setformData({
            ...formData,
            gps_cord:{lat:latlng.lat,lng:latlng.lng}
        });
    }


    const handleChangeImage = (e) => {
        const selected = e.target.files[0];
        if (!selected) return;

        setformData(prev=> ({
            ...prev,
            issue_image: selected
        }));

        setPreview(URL.createObjectURL(selected));
    };

    async function handleChange(e){
        setformData({...formData,[e.target.name]:e.target.value})
    }

    async function handleSubmit(e){
        e.preventDefault()
        if(!formData.title || !formData.description || !formData.gps_cord || !formData.issue_image){
            setMessage("All fields are required");return;
        }
        try{
            const data = new FormData()

            data.append("title", formData.title)
            data.append("description", formData.description)
            data.append("gps_cord", JSON.stringify(formData.gps_cord))
            data.append("issue_image", formData.issue_image)

            const res=await fetch("/api/report", {
                method: "POST",
                body:data
            })
            if(!res.ok){
                const data=await res.json();
                setMessage(data.error || "Something Went Wrong")
                return;
            }
            router.push("/")
        }
        catch(error){
            setMessage("Something Went Wrong")
        }  
    }

    return (
        <form className={style.flexCol} onSubmit={handleSubmit}>
            <GetBack/>
            <Image src={"/backgroundReport.svg"} alt="report_image" height={500} width={500} />
            <div className={style.container}>
                <div className={style.issueReport}>Report An Issue</div>
                <div className={style.joinRow}>
                    <div className={style.enlarge}>Title </div>
                    <input type="text" name="title" className={style.title} onChange={handleChange}></input>
                </div>
                
                <div className={style.joinCol}>
                    <div className={style.enlarge}>Description </div>
                    <textarea type="text" name="description" className={style.desc} onChange={handleChange}/>
                </div>

                <div className={style.joinRows}>
                    <div id="location" className={style.joinColNG}>
                    <GetCoordinates onLocationSelect={handleLocationSelect} /><div className={style.enlarge}>GPS Location</div>
                    </div>
                    <div className={style.upload}>
                        <input name="issue_image" type="file" accept="image/*" onChange={handleChangeImage}/>
                        {preview && (
                            <Image src={preview} alt="preview" width={80} height={80} style={{marginTop: "5px" }}/>
                        )}
                    </div>
                </div>

                <p style={{textAlign:"center"}}>{Message}</p>
                <button className={style.re_button} type="submit">Submit</button>
            </div>
        </form>
    )
}

