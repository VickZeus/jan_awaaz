import {NextResponse} from "next/server"
import supabase from "@/lib/supabase"
import IsLogged from "@/lib/loggedOrNot" 

export async function POST(req){
    const user=await IsLogged()
    if(!user)return NextResponse.json({error:"Unauthorized"},{status:401});

    const {id,upvote,downvote,message}=await req.json();
    const {data,error}=await supabase
        .from("issue_table")
        .update({upvotes:upvote,downvotes:downvote})
        .eq("issue_id",id)
        .select()
    
    if(error)return NextResponse.json({error:error.message,status:500});
    return NextResponse.json({
        message:"Update Successfull",
        data},{
        status:200
    })
}



export async function GET(req){
    const user=await IsLogged()
    if(!user)return NextResponse.json({error:"Unauthorized"},{status:401});

    const {searchParams}=new URL(req.url);
    const type=searchParams.get("type");
    const radius=parseFloat(searchParams.get("radius"))/111000 || 0.045;
    const long=parseFloat(searchParams.get("lon"));
    const lat=parseFloat(searchParams.get("lat"));

    if(type==="Recent"){
        const fiveHoursAgo = new Date(Date.now() - 5*60*60*1000).toISOString();
        const {data,error}=await supabase
            .from("issue_table")
            .select("*")
            .gte("created_at", fiveHoursAgo)
            .order("created_at",{ascending:false})
        if(error)return NextResponse.json({error:error.message},{status:500});

        return NextResponse.json({
            message:"Request Successfull",
            data},{
            status:200
        })
    }

    if(type==="Trending"){
        const {data,error}=await supabase
            .from("issue_table")
            .select("*")
            .order("created_at",{ascending:false})
            .limit(50)
        
        const filterData=data.filter((issue)=>issue.upvotes>2*issue.downvotes)            
        if(error)return NextResponse.json({error:error.message},{status:500});

        return NextResponse.json({
            message:"Request Successfull",
            data:filterData
            },
            {status:200}
        ) 
    }

    if (type==="Near Me") {
        const { data, error } = await supabase
            .from("issue_table")
            .select("*");

        if (error) {
            return NextResponse.json(
                { error: error.message },
                { status: 500 }
            );
        }
    function getDistance(lat1, lon1, lat2, lon2) {
        const R = 6371;
        const toRad = (val) => (val * Math.PI) / 180;
        const dLat = toRad(lat2 - lat1);
        const dLon = toRad(lon2 - lon1);

        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(toRad(lat1)) *
                Math.cos(toRad(lat2)) *
                Math.sin(dLon / 2) *
                Math.sin(dLon / 2);

        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R*c;
    }
    const radiusKm = parseFloat(searchParams.get("radius")) / 1000 || 5;

    const filteredData = (data || []).filter(issue => {
        if (issue.latitude==null || issue.longtitude==null) return false;

        const distance = getDistance(
            lat,
            long,
            Number(issue.latitude),
            Number(issue.longtitude)
        );
        return distance <= radiusKm;
    });
    return NextResponse.json(
        {
            message: "Request Successful",
            data: filteredData
        },
        { status: 200 }
        );
    }

    if(type==="Popular"){
        const {data,error}=await supabase
            .from("issue_table")
            .select("*")
            .order("created_at",{ascending:false})
            .limit(10)
        
        if(error)return NextResponse.json({error:error.message},{status:500});

        return NextResponse.json(
            {
                message:"Request Successfull",
                data:data
            },
            {status:200}
        )
    }
}


