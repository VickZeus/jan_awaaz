import {NextResponse} from "next/server"
import IsLogged from "@/lib/loggedOrNot" 
import supabase from "@/lib/supabase"
import {randomUUID} from "crypto";

export async function POST(req){
    const user=await IsLogged()
    if(!user){
        return NextResponse.json({error:"User not Logged In"},{status:"400"})
    }

    try{
        const formData=await req.formData();

        const title=formData.get("title");
        const description=formData.get("description");
        const gps_cord=JSON.parse(formData.get("gps_cord"));
        const image=formData.get("issue_image")

        const bytes=await image.arrayBuffer()
        const buffer=Buffer.from(bytes)
        const fileName=`${Date.now()}-${image.name}`

        const {data1,error:uploadError}=await supabase.storage
                        .from("report_images")
                        .upload(fileName,buffer,{contentType:image.type})
        
        const {data}=supabase.storage
                        .from("report_images")
                        .getPublicUrl(fileName)
        
        const image_url=data.publicUrl

        if(uploadError){
            return NextResponse.json({error:"Image Upload Failsed"},{status:500})
        }

        if(!title || !description || !gps_cord || !image){
            return NextResponse.json({error:"Null values found"},{status:500})
        }
        else{
            const uuid=randomUUID()
            const {data,error}=await supabase 
                                .from("issue_table")
                                .insert([{issue_id:uuid,title,description,latitude:gps_cord.lat,longtitude:gps_cord.lng,image_url}])
            console.log(error)
            if(error){
                return NextResponse.json({error:"Error occured"},{status:500})
            }
            else{
                return NextResponse.json({message:"Insertion Successfull"},{status:200})
            }
        }
    }
    catch(error){
        return NextResponse.json({error:"Unexpected Error Occurred"},{status:500})
    }
}