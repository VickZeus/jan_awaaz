import supabase from "@/lib/supabase"
import { NextResponse } from "next/server";
import bcrypt from "bcrypt"
import {randomUUID} from "crypto";
import  {sendOTP} from "@/lib/sendEmail";

function generateRandomImage(){
    let curr=Math.floor(Math.random()*30);
    return `/profile_pictures/avatar${curr}.png`;
}





export async function POST(req){ // Basically checks whether there exists any email already and initialises the profilepicture of the user to a random image from the profile_pictures folder and inserts the data into the database
    try{
        const body=await req.json()
        const {username,email,password}=body;
        const bpass=await bcrypt.hash(password,10)

        const imageURL=generateRandomImage();


        const {data:emailC,error:errEm}=await supabase 
                            .from("info_table")
                            .select("email")
                            .eq("email",email)
        if(errEm){
            return NextResponse.json({error:"Error occurred while checking email"},{status:500})
        }
        if(emailC.length>0){
            return NextResponse.json({error:"Email Already Exists"},{status:400})
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otp_has = await bcrypt.hash(otp, 10);

        const expires_at = new Date(Date.now() + 5 * 60 * 1000);
        

        const uuid=randomUUID();
        const {data,error}=await supabase
                            .from("userVerify_temp_table")
                            .insert([{oid:uuid,username,email,hpass:bpass,profile_pic:imageURL,otp_has,expires_at}])
        
        if(error){
            return NextResponse.json({error:error.message},{status:500})
        }   
        else{
            try{
                await sendOTP(email,otp);
            }
            catch(error){

                await supabase
                .from("userVerify_temp_table")
                .delete()
                .eq("email",email)

                return NextResponse.json(
                    {error:error.message},
                    {status:500}
                )
            }
            return NextResponse.json({message:email},{status:201})
        }

    }
    catch(err){
        return NextResponse.json({error:error.message},{status:500})
    }
} 




