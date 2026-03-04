// server side component
import style from "@/styles/reportpage.module.css"
import ImageUpload from "@/lib/uploadImage"
import Image from "next/image"
import GetCoordinates from "@/components/getCoordinates"
import GetBack from "@/components/getHome"

export default function ReportMP(){
    return (
        <form className={style.flexCol}>
            <GetBack/>
            <Image src={"/backgroundReport.svg"} alt="report_image" height={500} width={500} />
            <div className={style.container}>
                <div className={style.issueReport}>Report An Issue</div>
                <div className={style.joinRow}>
                    <div className={style.enlarge}>Title </div>
                    <input type="text" className={style.title}></input>
                </div>
                
                <div className={style.joinCol}>
                    <div className={style.enlarge}>Description </div>
                    <textarea type="text" className={style.desc}/>
                </div>

                <div className={style.joinRows}>
                    <div id="location" className={style.joinColNG}>
                        <GetCoordinates/>
                        <div className={style.enlarge}>GPS Location</div>
                    </div>
                    <ImageUpload/>
                </div>
                <button className={style.re_button} type="submit">Submit</button>
            </div>
        </form>
    )
}

