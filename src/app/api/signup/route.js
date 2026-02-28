import supabase from "@/lib/supabase"
import { NextResponse } from "next/server";
import bcrypt from "bcrypt"
import {randomUUID} from "crypto";

export async function POST(req){
    try{
        const body=await req.json()
        const {username,email,password}=body;
        const bpass=await bcrypt.hash(password,10)

        const uuid=randomUUID();
        const {data2,error2}=await supabase
                            .from("info_table")
                            .insert([{uuid,name:username,email}])
        if(error2)console.log(error2)
        const {data1,error1}=await supabase
                            .from("pass_table")
                            .insert([{uuid,pass:bpass}])
        if(error1)console.log(error1)

        if(error1 || error2){
            return NextResponse.json({error:"Table insertion error"},{status:400})
        }
        else{
            return NextResponse.json({message:"User Inserted"})
        }
    }
    catch(err){
        return NextResponse.json({error:"Server Error"},{status:500})
    }
} 