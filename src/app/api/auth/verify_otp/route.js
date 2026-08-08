import supabase from "@/lib/supabase"
import { NextResponse } from "next/server";
import bcrypt from "bcrypt"
import {randomUUID} from "crypto";



export async function POST(req){
    try{
        const body=await req.json();
        const {email,otp}=body;

        const {data,error}=await supabase
                            .from("userVerify_temp_table")
                            .select("*")
                            .eq("email",email)

        // verificatio part
        if(error || !data ||data.length===0)return NextResponse.json({error:"Invalid OTP"},{status:400})        

        const user=data[0];
        const isOtpValid=await bcrypt.compare(otp,user.otp_has);

        if(new Date(user.expires_at)<new Date()){
            const {error:delEr}= await supabase 
                                .from("userVerify_temp_table")
                                .delete()
                                .eq("email",email)
            if(delEr)return NextResponse.json({error:"Error occurred while deleting expired OTP"},{status:500})
            return NextResponse.json({error:"OTP Expired"},{status:400})
        }

        if(!isOtpValid)return NextResponse.json({error:"Invalid OTP"},{status:400})

        
        // insertion part
        const uuid = randomUUID();
        const {data:data2,error:error2}=await supabase
                            .from("info_table")
                            .insert([{uuid,name:user.username,email:user.email,profile_pic:user.profile_pic}])
        const {data:data1,error:error1}=await supabase
                            .from("pass_table")
                            .insert([{uuid,pass:user.hpass}])

        if(error1 || error2){
            return NextResponse.json({error:"Table insertion error"},{status:400})
        }
        else{
            // deletion part
            const {error:delEr}= await supabase 
                                .from("userVerify_temp_table")
                                .delete()
                                .eq("email",email)
            if(delEr)return NextResponse.json({error:"Error occurred while deleting temp data"},{status:500})
            
            return NextResponse.json({message:"User Inserted"},{status:201})
        }
    
    }
    catch(err){
        return NextResponse.json({error:"Server Error"},{status:500})
    }
}