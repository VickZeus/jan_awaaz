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
    const formData = await req.formData();

    const title = formData.get("title");
    const description = formData.get("description");
    const gps_cord = JSON.parse(formData.get("gps_cord"));
    const image = formData.get("issue_image");

    if (!title || !description || !gps_cord) {
        return NextResponse.json(
            { error: "Missing required fields" },
            { status: 400 }
        );
    }

    const DEFAULT_IMAGE = "https://nnbwatxqncfcddhtkrpw.supabase.co/storage/v1/object/public/report_images/no_image_found.png";

    let image_url = DEFAULT_IMAGE;

    if (image && image.size > 0) {
        const bytes = await image.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const fileName = `${Date.now()}-${image.name}`;

        const { error: uploadError } = await supabase.storage
            .from("report_images")
            .upload(fileName, buffer, {
                contentType: image.type
            });

        if (uploadError) {
            return NextResponse.json(
                { error: "Image upload failed" },
                { status: 500 }
            );
        }

        const { data } = supabase.storage
            .from("report_images")
            .getPublicUrl(fileName);

        image_url = data.publicUrl; 
    }
    const uuid = randomUUID();

    const { error } = await supabase
        .from("issue_table")
        .insert([
            {
                issue_id: uuid,
                title,
                description,
                latitude: gps_cord.lat,
                longtitude: gps_cord.lng,
                image_url
            }
        ]);

    if (error) {
        return NextResponse.json(
            { error: "Error occurred" },
            { status: 500 }
        );
    }

    return NextResponse.json(
        { message: "Insertion Successful" },
        { status: 200 }
    );

} catch (error) {
    return NextResponse.json(
        { error: "Unexpected Error Occurred" },
        { status: 500 }
    );
}
}