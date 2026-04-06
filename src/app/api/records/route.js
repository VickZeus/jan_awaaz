import {NextResponse} from "next/server"
import supabase from "@/lib/supabase"
import IsLogged from "@/lib/loggedOrNot" 

export async function POST(req){
    const user=await IsLogged()
    if(!user)return NextResponse.json({error:"Unauthorized",status:401});

    const {id,upvote,downvote,message}=await req.json();
    const {data,error}=await supabase
        .from("issue_table")
        .update({upvotes:upvote,downvotes:downvote})
        .eq("issue_id",id)
        .select();
    
    if(error)return NextResponse.json({error:error.message,status:500});
    return NextResponse.json({
        message:"Update Successfull",
        data,
        status:200
    })
}

export async function GET(req){
    const user=await IsLogged()
    if(!user)return NextResponse.json({error:"Unauthorized",status:401});
    
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


