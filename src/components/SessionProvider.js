"use client"
import {SessionProvider} from "next-auth/react"

export default function ProvideSession({children}){
    return(
        <SessionProvider>{children}</SessionProvider>
    )
}