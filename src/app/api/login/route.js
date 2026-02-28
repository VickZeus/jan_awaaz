import supabase from "@/lib/supabase"
import {NextResponse} from "next/server";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export async function POST(req){
    try{
        const body=await req.json()
        const {email,password}=body;
        const {data:id,error:err1}=await supabase
                            .from("info_table")
                            .select("uuid")
                            .eq("email",email)
                            .single()
        if(err1){
            console.log(err1);
            return NextResponse.json({error:"Email Not Found"},{status:401})
        }

        const {data:bpass,error:err2}=await supabase
                            .from("pass_table")
                            .select("pass")
                            .eq("uuid",id.uuid)
                            .single()
        if(err2){
            return NextResponse.json({error:"Unexpected Error Occured"},{status:401})
        }

        if(await bcrypt.compare(password,bpass.pass)){
            const token = jwt.sign(
                { email },
                process.env.JWT_SECRET,
                { expiresIn: "1d" }
            );
            const response=NextResponse.json({message:"User Verified"},{status:200})

            response.cookies.set("token", token, {
                httpOnly: true,
                secure: true,
                sameSite: "strict",
                path: "/",
            });

            return response;
        }
        else{
            return NextResponse.json({error:"Invalid Password"},{status:401})
        }
    }
    catch(err){
        console.log(err)
        return NextResponse.json({error:"Server Error"},{status:500})
    }
} 
