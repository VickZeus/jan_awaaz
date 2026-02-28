import jwt from "jsonwebtoken"
import {cookies} from "next/headers"

export default async function IsLogged() {
  const cookiestore=await cookies()
  const token=cookiestore.get("token")?.value
  if(!token) return null
  try{
    const decoded=jwt.verify(token, process.env.JWT_SECRET)
    return decoded
  } 
  catch(err) 
  {
    return null
  }
}