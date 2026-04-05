import {NextResponse} from "next/server"
import supabase from "@/lib/supabase"
import IsLogged from "@/lib/loggedOrNot" 


export async function GET(req){
    const user=await IsLogged()
    if(!user)return NextResponse.json({error:"User not Logged In"},{status:400})
    
    const {data,error}=await supabase
        .from("issue_table")
        .select("*")
        .order("created_at",{ascending:false})
        .limit(10)

    if(error)return NextResponse.json({error,status:500});
    return NextResponse.json({
        message:"Request Successfull",
        data,
        status:200
    })
}


