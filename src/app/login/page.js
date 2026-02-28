import style from "@/styles/loginpage.module.css"
import Form from "@/components/login"


export default function LoginPage(){
    return(
        <div className={style.container}>
            <Form/>
        </div>
    )
}

