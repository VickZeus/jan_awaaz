import { NextResponse } from "next/server";

// request will have : issueID and action (vote/upvote)
export async function POST(req){
    try{
        const body=await req.json()
        const {issueID,action}=body; 

    

    }
    catch(err){
        return NextResponse.json({})
    }
}