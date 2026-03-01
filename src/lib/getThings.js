import IsLogged from "@/lib/loggedOrNot" 
import supabase from "@/lib/supabase"


export async function GetPFP(){
    const user=await IsLogged()
    if(!user)return "/default_pfp.png"
    const {data,error}=await supabase
                            .from("info_table")
                            .select("profile_pic")
                            .eq("email",user.email)
                            .single()
    if(error){
        return "/default_pfp.png"
    }                        
    return data.profile_pic;
}

export async function GetUserName(){
    const user=await IsLogged()
    if(!user)return null
    const {data,error}=await supabase
                            .from("info_table")
                            .select("name")
                            .eq("email",user.email)
                            .single()
    if(error){
        return null
    }                        
    return data.name;
}

export async function GetRole(){
    const user=await IsLogged()
    if(!user) return null 

    const {data,error}=await supabase 
                            .from("user_info")
                            .select("role")
                            .eq("email",user.email)
                            .single()
    if(error){
        return user
    }
    else{
        return data.user
    }

}