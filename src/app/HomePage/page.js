"use client"
import {FootSection,Logo,LogoAndTitle} from "../page.js"
import useState from "react"
import {useRouter} from "next/navigation"
import style from  "@/styles/homepage.module.css"
import {signOut,useSession} from "next-auth/react"
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar"

function GrievanceOption(){
    return(
        <Menubar>
        <MenubarMenu className="text-black">
            <MenubarTrigger className=" hover:bg-white hover:text-black">Grievance Portal</MenubarTrigger>
            <MenubarContent className="w-fit">
                <MenubarItem className="hover:!bg-green-400 hover:!text-white">
                    Report An Issue
                </MenubarItem>
                <MenubarSeparator />
                <MenubarItem className="hover:!bg-green-400 hover:!text-white">
                    Previous Issues
                </MenubarItem>
                <MenubarSeparator />
            </MenubarContent>
        </MenubarMenu>
        </Menubar>
    )
}

function ProfileOption(){
    return(
        <Menubar>
        <MenubarMenu>
            <MenubarTrigger>Profile</MenubarTrigger>
            <MenubarContent>
            <MenubarItem className="hover:!bg-green-400 hover:!text-white">Edit Profile</MenubarItem>
            <MenubarItem className="hover:!bg-green-400 hover:!text-white">New Window</MenubarItem>
            <MenubarSeparator />
            <MenubarItem className="hover:!bg-red-400 hover:!text-white" onClick={()=>signOut({callbackUrl:"/"})}>LogOut</MenubarItem>
            </MenubarContent>
        </MenubarMenu>
        </Menubar>
    )
}


function Options(){
    return(
        <div className={style.row_flex} style={{gap:"10px"}}>
            <GrievanceOption/>
            <ProfileOption/>
        </div>
    )
}

function HeadSection(){
    const router=useRouter();
    return(
        <div className={`${style.row_flex} ${style.mblayout} heading`}>
            <div className={`${style.title}`}>JanAwaaz</div>
            <Logo/>
            <Options/>
        </div>
    )
}

export default function HomePage(){
    return(
        <div>
            <HeadSection/>
            <FootSection/>
        </div>
    )
}
