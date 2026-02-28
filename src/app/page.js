import IsLogged from "@/lib/loggedOrNot"
import style from "../styles/homepage.module.css"
import Option3 from "@/components/profile_login"


function LogoTitle() {
  const text = "JanAwaaz";
  return (
    <div className={style.logoTitle}>
      {text.split("").map((char,index)=>(
        <span key={index} className={style.letter}>{char}</span>
      ))}
      <Logo/>
    </div>
  );
}

function Logo(){
  return(
    <>
      <div className={style.logo}>
        <div className={style.box}></div>
        <div className={style.box}></div>
        <div className={style.box}></div>

        <div className={style.box}></div>
        <div className={style.box}></div>
        <div className={style.box}></div>

        <div className={style.box}></div>
        <div className={style.box}></div>
        <div className={style.box}></div>
      </div>
    </>
  )
}


function Footer(){
  return(
    <>
      <div className={style.footer}>Footer Section</div>
    </>
  )
}

function HeadSection()
{
  const user=IsLogged()
  return(
    <div className={style.headSection}>
      <LogoTitle/>
      <div className={`${style.colFlex} ${style.options}`}>
        <button className={style.OptButton}>Menu</button>
        <button className={style.OptButton}>Report</button>
        <Option3 user={user}/>
      </div>
    </div>
  )
}



function MainContent(){
  return(
    <div className={style.mainContent}>Main Content</div>
  )
}

export default function Home() {
  return (
    <div className={style.homepage}>
      <HeadSection/>
      <MainContent/>
      <Footer/>
    </div>
  )
}

export {LogoTitle,Logo,Footer,HeadSection,MainContent}


